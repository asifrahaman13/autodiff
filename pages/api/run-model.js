// pages/api/run-model.js
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const {motion_module,prompt } = req.body;
        console.log( motion_module,prompt);
        // Run the model using Replicate (you can keep the same logic here)
        const output = await replicate.run(
          "lucataco/animate-diff:1531004ee4c98894ab11f8a4ce6206099e732c1da15121987a8eef54828f0663",
          {
            input: {
              motion_module,
              prompt,
            },
          }
        );
        console.log(output)
        res.status(200).json(output);
      } catch (error) {
        console.error('Error running the model:', error);
        res.status(500).json({ error: 'An error occurred' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed.' });
    }
  }
  