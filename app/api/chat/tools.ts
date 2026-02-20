import { tool } from "ai";
import { z } from "zod";

export const getTimeTable = tool({
  description: `
Get the latest class timetable for College of Engineering Guindy students.
Use this when a student asks about their daily schedule, class timings, or batch timetable.
Class means year number (1st year to 4th year) and batch refers to section A or B.
`,

  inputSchema: z.object({
    class: z.number()
      .min(1)
      .max(4)
      .describe("Year of study in CEG (1 = First Year, 2 = Second Year, 3 = Third Year, 4 = Final Year)"),

    batch: z.string()
      .describe("Student section inside the class, usually 'A' or 'B'")
  }),

  execute: async ({ class: classNumber, batch }) => {
    const timetable: Record<number, Record<string, string[]>> = {
      1: {
        A: ["8:30-9:30 DSA", "10:30-11:30 OOP"],
        B: ["9:30-10:30 Math", "11:30-12:30 Physics"],
      },
      2: {
        A: ["8:30-9:30 DBMS", "10:30-11:30 OS"],
        B: ["9:30-10:30 English", "11:30-12:30 Chemistry"],
      },
      3: {
        A: ["8:30-9:30 Networks", "10:30-11:30 AI"],
        B: ["9:30-10:30 History", "11:30-12:30 Geography"],
      },
      4: {
        A: ["8:30-9:30 ML", "10:30-11:30 Ethics"],
        B: ["9:30-10:30 Art", "11:30-12:30 PE"],
      },
    };

    const classData = timetable[classNumber];
    if (!classData) {
      return [`No timetable found for year ${classNumber}`];
    }

    const batchUpper = (batch || '').toUpperCase();
    if (!classData[batchUpper]) {
      return [`No timetable found for year ${classNumber} batch ${batch}`];
    }

    return classData[batchUpper];
  }
});

export const tools = {
  getTimeTable
};
