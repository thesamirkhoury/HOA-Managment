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

function UsernameReminder() {
  //!placeholder data
  let firstName = "${firstName}";
  let username = "${username}";
  return (
    <Html lang="he" dir="rtl">
      <Head />
      <Preview>תזכורת לשם המשתמש</Preview>
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
                שם המשתמש שלך למערכת הדיירים
              </Heading>
              <Text className="text-black text-center text-[18px] leading-[24px]">
                שלום {firstName},
              </Text>
              <Text className="text-black text-center text-[18px] leading-[24px]">
                ,הועד שלך שלח לך את שם המשתש למערכת ניהול ועד הבית כתזכורת
                החשבון שלך כבר קיים במערכת.
              </Text>
            </Section>
            {/* Data Section */}
            <Section className="text-center mt-[10px] mb-[32px]">
              <Text className="text-black text-[14px] leading-[24px] text-center">
                שם המשתמש שלך:
                <br />
                <strong>{username}</strong>
              </Text>
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                href={"${process.env.TENANTS_URL}"}
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

export default UsernameReminder;
