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

function ResetPassword() {
  //!placeholder data
  let firstName = "ישראל";
  let url = "123";

  return (
    <Html lang="he" dir="rtl">
      <Head />
      <Preview>הושג עבורך דרישת תשלום חדשה</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            {/* Logo Section */}
            <Section className="mt-[32px]">
              <Img
                src={`/static/logo.svg`}
                width="212"
                height="88"
                alt="logo"
              />
            </Section>

            {/* Subject Section */}
            <Section>
              <Heading className="text-black text-center font-normal text-[24px]">
                שחכת את הסיסה שלך?
              </Heading>
              <Text className="text-black text-[18px] leading-[24px]">
                שלום {firstName},
              </Text>
              <Text className="text-black text-[18px] leading-[24px]">
                קיבלנו בקשה לאיפוס הסיסמה שלך, מצורף קישור לבחירת סיסמה חדשה.
              </Text>
            </Section>

            {/* CTA Section */}
            <Section className="text-center">
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center center"
                href={url}
              >
                איפוס סיסמה
              </Button>
              <Text className="text-black text-[14px] leading-[24px]">
                או בקישור הבא:
                <br />
                <Link href={url} className="text-blue-600 no-underline">
                  {url}
                </Link>
              </Text>
              <Text className="text-[12px]">
                הקישור תקף ל-10 דקות בלבד.
                <br />
                אם לא ביקשת להחליף את הסיסמה ניתן להתעלם מהייל הזה.
              </Text>
            </Section>

            {/* Footer */}
            <Section>
              <Text className="text-[#666666]">
                ההודעה הזאת נשלחה באופן אוטומאטי, כי המייל שלך מופיע במערכת
                ניהול ועד בית כדייר.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default ResetPassword;
