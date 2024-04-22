import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="bg-brand/20 py-10 md:py-20 mt-10 px-5">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-around gap-6 md:gap-10 items-center text-center md:text-start">
        <div className="space-y-2">
          <span className="text-sm font-semibold rounded px-2 bg-yellow-100">
            Newsletter
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Subscribe to newsletter
          </h2>
          <p className="font-semibold text-sm">
            Stay in the know on new free e-book
          </p>
        </div>

        <div className="mt-4">
          <div className="flex flex-row">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full bg-gray-50 p-2 rounded-s-sm focus:outline-none focus:bg-white"
            />
            <Button type="button" padding="lg">
              Subscribe
              <ArrowRight size={14} />
            </Button>
          </div>

          <div className="flex items-center mt-2 gap-1">
            <Lock size={14} />
            <p className="text-sm text-gray-800">
              Your information is safe with us! unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
