import { app } from "@/http/server";

const port = process.env.PORT || 3300;

function main() {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main();
