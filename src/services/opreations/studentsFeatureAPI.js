// import toast from "react-hot-toast";
// import { studentEndpoints } from "../apis";
// import { apiConnector } from "../apiConnector";
// import rzpLogo from "../../assets/Logo/rzp_logo.png";
// import { setPaymentLoading } from "../../slices/courseSlice";
// import { resetCart } from "../../slices/cartSlice";

// const {
//   COURSE_PAYMENT_API,
//   COURSE_VERIFY_API,
//   SEND_PAYMENT_SUCCESS_EMAIL_API,
// } = studentEndpoints;

// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;

//     script.onload = () => {
//       resolve(true);
//     };

//     script.onerror = () => {
//       resolve(false);
//     };

//     document.body.appendChild(script);
//   });
// }

// export async function buyCourse(token,courses,userDetails,navigate,dispatch) {
//   const toastId = toast.loading("Loading...");
//   try {

//     // loading the script
//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );

//     if(!res){
//         toast.error("Razorpay SDK failed to load...");
//         return;
//     }

//     // initiate the order
//     const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,{courses},{
//         Authorization:`Bearer ${token}`
//     });
//     console.log("order response",orderResponse.data);
    
//     if(!orderResponse.data.success){
//         throw new Error(orderResponse.data.message);
//     };

//     // creating options
//     const options ={
//         key:import.meta.env.VITE_RAZORPAY_KEY_ID,
//         currency:orderResponse.data.message.currency,
//         amount:orderResponse.data.message.amount,
//         order_id:orderResponse.data.message.id,
//         name:"StudyNotion",
//         description:"Thank You for Purchasing the Course",
//         // image:rzpLogo,
//         prefill:{
//             name:`${userDetails.firstName} ${userDetails.lastName}`,
//             email:userDetails.email
//         },
//         handler: function(response){
//             // send successfull email
//             sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token); 

//             // verifyPayment
//             verifyPayment({...response,courses},token,navigate,dispatch);
//         },
//     }

//     const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//         paymentObject.on("payment.failed", function(response) {
//             toast.error("oops, payment failed");
//             console.log(response.error);
//         })

//   } catch (error) {
//     console.log("PAYMENT API ERROR....",error);
//     toast.error("Couldn't make Payment")
//   }
//   toast.dismiss(toastId);
// }

// async function sendPaymentSuccessEmail(response,amount,token) {
//     try {
//         await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
//             orderId:response.razorpay_order_id,
//             paymentId:response.razorpay_payment_id,
//             amount
//         },{
//             Authorization: `Bearer ${token}`
//         })
//     } catch (error) {
//         console.log("PAYMENT SUCCESS EMAIL ERROR...",error);
//     }
// }

// async function verifyPayment (bodyData,token,navigate,dispatch) {
//     const toastId = toast.loading("Verifying Payment...");
//     dispatch(setPaymentLoading(true));

//     try {
//         const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
//             Authorization:`Bearer ${token}`
//         });

//         if(!response.data.success){
//             throw new Error(response.data.message);
//         }
//         toast.success("Payment Successfull, You are added to the Course...");
//         navigate("/dashboard/enrolled-courses");
//         dispatch(resetCart());
//     } catch (error) {
//         console.log("PAYMENT VERIFY ERROR ...",error);
//         toast.error("Couldn't verify Payment")
//     }
//     toast.dismiss(toastId);
//     dispatch(setPaymentLoading(false));
//  }


import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
  const toastId = toast.loading("Loading...");
  try {
    const scriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!scriptLoaded) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, { courses }, {
      Authorization: `Bearer ${token}`,
    });

    const orderData = orderResponse?.data?.message;
    const success = orderResponse?.data?.success;

    if (!success || !orderData) {
      const errorDetails = orderResponse?.data?.message;
      const userMessage =
        errorDetails?.description ||
        errorDetails?.reason ||
        "Payment initiation failed. Please try again.";
      toast.error(userMessage);
      console.error("Payment initiation error:", errorDetails);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      currency: orderData.currency,
      amount: orderData.amount,
      order_id: orderData.id,
      name: "StudyNotion",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(response, orderData.amount, token);
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };

    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        toast.error("Payment failed. Please try again.");
        console.error("Payment failed:", {
          code: response.error.code,
          reason: response.error.reason,
          description: response.error.description,
          source: response.error.source,
          step: response.error.step,
          metadata: response.error.metadata,
        });
      });
    } catch (err) {
      toast.error("Unable to initiate Razorpay checkout.");
      console.error("Razorpay SDK error:", err);
    }
  } catch (error) {
    console.error("PAYMENT API ERROR:", error);
    toast.error("Couldn't make payment. Please try again.");
  } finally {
    toast.dismiss(toastId);
  }
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
      amount,
    }, {
      Authorization: `Bearer ${token}`,
    });
  } catch (error) {
    console.error("PAYMENT SUCCESS EMAIL ERROR:", error);
  }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment successful! You are added to the course.");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.error("PAYMENT VERIFY ERROR:", error);
    toast.error("Couldn't verify payment.");
  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}