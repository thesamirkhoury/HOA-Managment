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

function ForwardSupplier() {
  //!placeholder data
  let description =
    "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף";

  return (
    <Html lang="he" dir="rtl">
      <Head />
      <Preview>פרטי קריאת שירות</Preview>
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
                פרטי קריאת שירות
              </Heading>
              <Text className="text-black text-[18px] leading-[24px]">
                להלן פרטי קריאת השירות:
              </Text>
              <Text className="text-black text-[18px] leading-[24px] text-center">
                {description}
              </Text>
            </Section>

            {/* Footer */}
            <Section>
              <Text className="text-[#666666]">
                ההודעה הזאת נשלחה באופן אוטומאטי, כי ועד בית העביר לך פרטי הקריאה כספק.
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default ForwardSupplier;
