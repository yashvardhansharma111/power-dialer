import { Request, Response } from "express";
import client from "../utils/twilioClient";

export const getAvailableNumbers = async (req: Request, res: Response) => {
  try {
    console.log("Fetching available Twilio numbers...");
    const numbers = await client.incomingPhoneNumbers.list();

    console.log("Fetched numbers:", numbers); // ✅ log response to see details

    res.json(
      numbers.map((num) => ({
        sid: num.sid,
        phoneNumber: num.phoneNumber,
      }))
    );
  } catch (err: any) {
    console.error("Twilio Error:", err); // ✅ log the full error
    res.status(500).json({ message: "Failed to fetch numbers" });
  }
};
