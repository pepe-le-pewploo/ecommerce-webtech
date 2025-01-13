// import { Button } from "@/components/ui/button";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import "./Home.css";
// import { depositMoney, fetchBalance, withdrawBalance } from "@/store/auth-slice";
// import { useToast } from "@/hooks/use-toast";

// const Home = () => {
//   const { user } = useSelector((state) => state.auth);
//   console.log(user.id, "Home");
//   const [isDepositClicked, setIsDepositClicked] = useState(false);
//   const [isWithdrawClicked, setIsWithdrawClicked] = useState(false);
//   const [isFetchClicked, setIsFetchClicked] = useState(false);
//   const dispatch = useDispatch();
//   const { toast } = useToast();
//   const handleButtonClick = async (action) => {
//     if (action === "deposit") {
//       const data = await dispatch(
//         depositMoney({
//           amount: 500,
//           userId: user.id,
//         })
//       );
//       console.log(data);
//       if (data?.payload?.success) {
//         setIsDepositClicked(true);
//         toast({
//           title: data?.payload?.message,
//         });
//         setIsDepositClicked(true);
//         setIsFetchClicked(false);
//         setIsWithdrawClicked(false);
//         return;
//       }
//     }

//     if (action === "withdraw") {
//       console.log('withdraw')
//       const data = await dispatch(
//         withdrawBalance({
//           amount: 500,
//         })
//       );
//       console.log(data)
//       if (data?.payload?.success) {   
//         toast({
//           title: 'amount withdrawn',
//         });
//         setIsDepositClicked(false);
//         setIsFetchClicked(false);
//         setIsWithdrawClicked(true);
//         return;
//       }
//     }

//     if (action === "check") {
//       console.log('inside')
//       const data = await dispatch(
//         fetchBalance()
//       );;
//       console.log(data, 'inside')
//       if (data?.payload?.success) {
        
//         toast({
//           title: data?.payload?.message,
//         });
//         setIsDepositClicked(false);
//         setIsFetchClicked(true);
//         setIsWithdrawClicked(false);
//         return;
//       }
//     }
    
//   };

//   useDispatch(() => {
//     const getBalance = async () => {
//       await dispatch(fetchBalance());
//     };
//     getBalance()
//   }, [dispatch]);

//   console.log()
//   return (
//     <div>
//       <Button className="butt" onClick={() => handleButtonClick("deposit")}>
//         Deposit
//       </Button>
//       <Button className="butt" onClick={() => handleButtonClick("withdraw")}>
//         Withdraw
//       </Button>
//       <Button className="butt" onClick={() => handleButtonClick("check")}>
//         Balance
//       </Button>
//       {/* {
//         (isDepositClicked || isWithdrawClicked || isFetchClicked) ? 
//         <h1>user.balance</h1> : null
//       } */}
//     </div>
//   );
// };

// export default Home;
