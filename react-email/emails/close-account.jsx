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
  Link,
} from "@react-email/components";

function CloseAccount() {
  //!placeholder data
  let firstName = "ישראל";
  return (
    <Html lang="he" dir="rtl">
      <Head />
      <Preview>אישור סגירת חשבון</Preview>
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
                אישור על סגירת חשבון הועד
              </Heading>
              <Text className="text-black text-[18px] leading-[24px]">
                שלום {firstName},
              </Text>
              <Text className="text-black text-[18px] leading-[24px]">
                המייל הזה מאשר את סגירת החשבון שלך.
                <br />
                כל המידע ייחק במהלך הדקות הקובות, כולל כל ההוצאות וההכנסות,
                ותחסם גישת הדיירים למערכת.
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                הפעולה הינה סופית והידע לא ניתן לשיחזור.
                <br />
                זה הינו אישור סופי, הודעה נוספת לא תשלח.
              </Text>
            </Section>

            {/* Terms and Conditions */}
            <Section>
              <Text className="text-[#666666]">
                ההודעה הזאת נשלחה באופן אוטומאטי.
                <br />
                כל מהשצוין לעיל הינו בהתאם
                <Link href={"/terms"} className="text-blue-600 no-underline">
                  לתנאי השימוש.
                </Link>
                <br />
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default CloseAccount;
