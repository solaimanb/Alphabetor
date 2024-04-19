import Mux from "@mux/mux-node";
// import { Mux } from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

// const { Video } = new Mux(
//   process.env.MUX_TOKEN_ID!,
//   process.env.MUX_TOKEN_SECRET!
// );

// const { Video } = new (Mux as any)(
//   process.env.MUX_TOKEN_ID,
//   process.env.MUX_TOKEN_SECRET
// );

const mux = new Mux({
  tokenId: process.env["MUX_TOKEN_ID"],
  tokenSecret: process.env["MUX_TOKEN_SECRET"],
});

console.log("Video from mux", mux.video);

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: params.chapterId,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return new NextResponse(JSON.stringify(deletedChapter), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    // return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  console.log("[PATCH]", params);
  try {
    const { userId } = auth();
    console.log("USER_ID: From patch route-", userId);

    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    console.log("VALUES: From patch route-", values);

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);

        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      console.log("Before creating asset");
      const response = await mux.video.assets.create({
        input: [
          {
            url: values.videoUrl,
          },
        ],
        playback_policy: ["public"],
      });

      const asset = response;

      console.log("ASSET", asset);

      await db.muxData.create({
        data: {
          assetId: asset.id,
          chapterId: params.chapterId,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
