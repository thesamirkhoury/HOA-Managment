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
  let firstName = "${firstName}";

  return (
    <Html lang="he" dir="rtl">
      <Head />
      <Preview>אישור סגירת חשבון</Preview>
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
                אישור על סגירת חשבון הועד
              </Heading>
              <Text className="text-black text-center text-[18px] leading-[24px]">
                שלום {firstName},
              </Text>
              <Text className="text-black text-center text-[18px] leading-[24px]">
                המייל הזה מאשר את סגירת החשבון שלך.
                <br />
                .כל המידע השמור ימיחק במהלך הדקות הקרובות, כולל כל ההוצאות
                וההכנסות,
                <br />
                גישתך וגית כל הדיירים של הועד שלך תחסם במהלך הדקות הקובות.
              </Text>
              <Text className="text-black text-center text-[14px] leading-[24px]">
                הפעולה הינה סופית והמידע לא ניתן לשיחזור.
                <br />
                זה הינו אישור סופי, הודעה נוספת לא תשלח.
              </Text>
            </Section>

            {/* Terms and Conditions */}
            <Section>
              <Text className="text-[#666666] text-center">
                ההודעה הזאת נשלחה באופן אוטומאטי.
                <br />
                כל מהשצוין לעיל הינו בהתאם
                <Link
                  href={"${process.env.TERMS_URL}"}
                  className="text-blue-600 no-underline"
                >
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
