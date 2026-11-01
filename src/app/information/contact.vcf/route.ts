import { profile } from "@/data/profile";
import { absoluteUrl } from "@/lib/seo";

const escape = (value: string) => value.replace(/([\\,;])/g, "\\$1");

export function GET() {
    const { name, title, email, phone, location, social } = profile;
    const parts = name.split(" ");
    const family = parts[0];
    const given = parts.slice(1).join(" ");

    const card = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${escape(family)};${escape(given)};;;`,
        `FN:${escape(name)}`,
        `TITLE:${escape(title)}`,
        `TEL;TYPE=CELL:${phone.replace(/\s/g, "")}`,
        `EMAIL;TYPE=INTERNET:${email}`,
        `ADR;TYPE=WORK:;;;${escape(location.city)};;;${escape(location.country)}`,
        `URL:${absoluteUrl("/")}`,
        `X-SOCIALPROFILE;TYPE=linkedin:${social.linkedin}`,
        `X-SOCIALPROFILE;TYPE=github:${social.github}`,
        `X-SOCIALPROFILE;TYPE=telegram:${social.telegram}`,
        "END:VCARD",
        "",
    ].join("\r\n");

    return new Response(card, {
        headers: {
            "Content-Type": "text/vcard; charset=utf-8",
            "Content-Disposition": 'attachment; filename="Do-Hoang-Vu.vcf"',
        },
    });
}
