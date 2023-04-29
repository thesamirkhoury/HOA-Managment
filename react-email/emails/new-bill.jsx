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
} from "@react-email/components";

function NewBill() {
  //!placeholder data
  let firstName = "ישראל";
  let amount = "123";
  let due = "1/1/1970";

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
                דרישת תשלום חדשה
              </Heading>
              <Text className="text-black text-[18px] leading-[24px]">
                שלום {firstName},
              </Text>
              <Text className="text-black text-[18px] leading-[24px]">
                התקבלה דרישת תשלום חדשה עבורך על סך {amount} ש״ח.
                <br />
                לפרטים נוספים יש להכנס למערכת הדיירים.
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

export default NewBill;
