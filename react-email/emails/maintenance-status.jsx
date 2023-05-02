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

function MaintenanceStatus() {
  //!placeholder data
  let firstName = "${tenant.firstName}";
  let subject = "${requestSubject}";

  return (
    <Html lang="he" dir="rtl">
      <Head />
      <Preview>עודכן סטטוס קריאת השירות שלך</Preview>
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
                עודכן סטטוס קריאת השירות שלך
              </Heading>
              <Text className="text-black text-center text-[18px] leading-[24px]">
                שלום {firstName},
              </Text>
              <Text className="text-black text-center text-[18px] leading-[24px]">
                התעדכן הסטטוס לקריאת השירות שפתחת בנושה {subject}.
                <br />
                לפרטים נוספים יש להכנס למערכת הדיירים.
              </Text>
            </Section>

            {/* Link Section */}
            <Section className="text-center">
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                href={"${process.env.TENANTS_URL}/maintenance"}
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

export default MaintenanceStatus;
