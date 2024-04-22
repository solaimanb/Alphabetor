import { Languages, Mail, Phone } from "lucide-react";
import React from "react";

interface ContactInfoProps {
  Icon: any;
  children: any;
}

interface LanguageOptionProps {
  value: any;
  children: any;
}

const ContactInfo = ({ Icon, children }: ContactInfoProps) => (
  <span className="flex items-center gap-1">
    <Icon size={16} /> {children}
  </span>
);

const LanguageOption = ({ value, children }: LanguageOptionProps) => (
  <option value={value} className="bg-white">
    {children}
  </option>
);

const HeaderContact = () => {
  const languages = ["English"];

  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      <div className="flex gap-5">
        <ContactInfo Icon={Mail}>edu.aphabetor@gmail.com</ContactInfo>
        <span className="bg-black w-[1px]"></span>
        <ContactInfo Icon={Phone}>+001 23456789</ContactInfo>
        <span className="bg-black w-[1px]"></span>
      </div>

      <div className="flex items-center gap-1">
        <Languages size={16} />
        <select name="" id="" className="p-1 bg-transparent">
          {languages.map((language) => (
            <LanguageOption value={language.toLowerCase()} key={language}>
              {language}
            </LanguageOption>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HeaderContact;
