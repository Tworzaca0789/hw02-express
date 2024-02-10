import {
  User,
  subscriptionUserSchema,
} from "../../service/schemas/user.schemas.js";

export async function updateSubscription(req, res, next) {
  const validationSubs = subscriptionUserSchema.validate(req.body);
  if (validationSubs.error) {
    return res.status(400).json({
      status: "400 Bad Request",
      "Content-Type": "application/json",
      ResponseBody: validationSubs.error,
    });
  }
  const { _id: user } = req.user;
  const subscriptionBody = await User.findByIdAndUpdate(user, req.body, {
    new: true,
  });

  return res.status(200).json({
    status: "200 OK",
    "Content-Type": "application/json",
    message: "Subscription user complete",
    ResponseBody: {
      user: {
        email: subscriptionBody.email,
        subscription: subscriptionBody.subscription,
      },
    },
  });
}
