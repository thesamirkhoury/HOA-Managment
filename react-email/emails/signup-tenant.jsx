import React from "react";
import {
  Html,
  Head,
  Preview,
  Tailwind,
  Body,
  Container,
  Img,
  Section,
  Heading,
  Text,
  Button,
  Link,
} from "@react-email/components";

function SignupTenant() {
  //!placeholder data
  let firstName = "${firstName}";
  let username = "${username}";
  let token = "${token}";

  return (
    <Html lang="he" dir="rtl">
      <Head />
      <Preview>הנחיות להרשמה למערכת הדיירים</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            {/* Logo Section */}
            <Section className="mt-[32px] grid justify-center">
              <Img
                src={"${process.env.LOGO_URL}"}
                width="212"
                height="88"
                alt="logo"
                className="bg-white"
              />
            </Section>
            {/* Subject Section */}
            <Section>
              <Heading className="text-black text-center font-normal text-[24px]">
                הועד שלך רוצה לצרף אותך למערכת נהל.
              </Heading>
              <Text className="text-black text-center text-[18px] leading-[24px]">
                שלום {firstName},
              </Text>
              <Text className="text-black text-center text-[18px] leading-[24px]">
                הועד שלך הוסיף אותך למערכת ניהול ועד הבית, להלן פרטי החשבון שלך.
              </Text>
            </Section>

            {/* Data Section */}
            <Section className="text-center mt-[32px] mb-[32px]">
              <Text className="text-black text-[14px] leading-[24px] text-center">
                שם המשתמש שלך:
                <br />
                <strong>{username}</strong>
              </Text>
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                href={"${process.env.TENANTS_URL}/set-password/${token}"}
              >
                ליצירת סיסמה
              </Button>
              <Text className="text-black text-[14px] leading-[24px]">
                או ללחוץ/להעתיק את הקישור הבא:
                <br />
                <Link
                  href={"${process.env.TENANTS_URL}/set-password/${token}"}
                  className="text-blue-600 no-underline"
                >
                  {token}
                </Link>
              </Text>
              <Text className="text-[12px]">הקישור תקף ל-3 ימים בלבד.</Text>
            </Section>

            {/* Terms and Conditions */}
            <Section>
              <Text className="text-[#666666] text-center">
                בעת השלמת ההרשמה למערכת, אתה מסקים
                <Link
                  href={"${process.env.TERMS_URL}"}
                  className="text-blue-600 no-underline"
                >
                  לתנאי השימוש.
                </Link>
                <br />
                ההודעה הזאת נשלחה באופן אוטומאטי.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default SignupTenant;
