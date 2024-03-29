import React from "react";

function About() {
  return (
    <div className="mt-2" id="about">
      <hr />
      <div className="mt-2 ms-3 mb-2">
        <h2 className="mt-2 ">מה זה נהל?</h2>
        <p className="fs-4">
          נהל היא מערכת ניהול ועד בית שמותאמת לשימוש במחשבים ובטלפונים חכמים
          ובטאבלטים. הממערכת נבנת כדי לענות על הצרכים של ועועד הבית והדיירים
          בצורה דיגיטאלית.
        </p>
        <p className="fs-4">
          המטרה של המערכת היא לאחד את כל הכלים שהועד והדיירים יצטרכו לניהול
          הנכסים שלהם במקום אחד עם שפת עיצוב פשוטה וידידות למשתמש.
        </p>
        <p className="fs-6">
          המערכת נבנתה במהלך פרויקט גמר במחלקה להנדסת תוכנה במכללת עזריאלי (נא
          להתיחס לדף תנאי השימוש לפני יצירת חשבון)
        </p>
      </div>
    </div>
  );
}

export default About;
