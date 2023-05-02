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
} from "@react-email/components";

function BillReminder() {
  //!placeholder data
  let firstName = "${tenant.firstName}";
  let amount = "${amount}";

  return (
    <Html lang="he" dir="rtl">
      <Head />
      <Preview>תזכורת לתשלום דרישת תשלום </Preview>
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
                תזכורת לתשלום דרישת תשלום
              </Heading>
              <Text className="text-black text-center text-[18px] leading-[24px]">
                שלום {firstName},
              </Text>
              <Text className="text-black text-center text-[18px] leading-[24px]">
                זאת תזכורת לשלם דרישת תשלום שהופקה על ידי הועד שלך על סך{" "}
                {amount} ש״ח.
                <br />
                לפרטים נוספים יש להכנס למערכת הדיירים.
              </Text>
            </Section>

            {/* Link Section */}
            <Section className="text-center">
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center center"
                href={"${process.env.TENANTS_URL}/billing"}
              >
                כניסה למערכת
              </Button>
            </Section>

            {/* Footer */}
            <Section>
              <Text className="text-[#666666] text-center">
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

export default BillReminder;
