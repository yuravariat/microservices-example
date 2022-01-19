import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/users/signout", (req: Request, res: Response) => {
  if(req.session?.jwt){
    req.session = null;
  }
  res.send({});
});

export { router as signoutRouter };
