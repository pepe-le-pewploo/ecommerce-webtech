import React, { useEffect, useState } from 'react'
import './FunctionalComponents.css'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { depositMoney, fetchBalance, withdrawBalance } from '@/store/bank-slice'
import { useToast } from '@/hooks/use-toast'

const FunctionalComponents = () => {
  const {user} = useSelector(state => state.auth)
  const {bank} = useSelector(state => state.bank)
  const [inputDepositValue, setInputDepositValue] = useState('');
  const [inputWithdrawValue, setInputWithdrawValue] = useState('');
  const [isClicked, setIsClicked] = useState(false)
  const {toast} = useToast()
  const dispatch = useDispatch();
  //console.log(user, "functional")
  const handleDepositFormSubmit = async (event) => {
    event.preventDefault()
    console.log('Input Value:', inputDepositValue);
    const value = Number(inputDepositValue)
    const data = await dispatch(depositMoney({
      userId: user.id, amount: value
    }))
    if(data?.payload?.success) {
      toast({
        title: `$${value} has been deposited successfully`
      })
    }
    setInputDepositValue('')
  }
  const handleDepositInputChange = (event) => {
    setInputDepositValue(event.target.value)
  }
  const handleWithdrawFormSubmit = async (event) => {
    event.preventDefault()
    console.log('Input Value:', Number(inputWithdrawValue));
    const val = Number(inputWithdrawValue)
    if(val> bank) {
      toast({
        title: `You do not have sufficient balance to complete this transaction`,
        variant: 'destructive'
      })
      setInputWithdrawValue('')
      return
    }
    const data = await dispatch(withdrawBalance({
      amount: val
    }))
    if(data?.payload?.success) {
      toast({
        title: `$${val} has been withdrawn successfully`
      })
    }
    setInputWithdrawValue('')
  }
  const handleWithdrawInputChange = (event) => {
    setInputWithdrawValue(event.target.value)
  }
  const handleClick = () => {
    setIsClicked(prevValue => !prevValue)
  }
  useEffect(() => {
    dispatch(fetchBalance())
  },[dispatch])
  console.log(bank, 'bank')
  return (
    <>
      <div className='userinfo'>
        <h1>Welcome! {user.userName}</h1>
        <p><span>Account No.</span> {user.id}</p>
        {
          isClicked ? <p className='hidbalance'><span>Current Balance:</span> ${bank}</p> : null
        }
      </div>
      <div className='components'>
        <button onClick={handleClick} className='balance'>{!isClicked? 'Get Balance': 'Minimize'}</button>
      </div>
      <form className="fetch" onSubmit={ handleDepositFormSubmit}>
      <input
        type="text"
        className="deposit-input"
        placeholder="Deposit Amount"
        value={inputDepositValue} // Controlled component: value is derived from state
        onChange={ handleDepositInputChange} // Update state on every input change
        required
      />
      <button type="submit" className="deposit-button">
        Deposit
      </button>
    </form>
    <form className="fetch" onSubmit={ handleWithdrawFormSubmit}>
      <input
        type="text"
        className="withdraw-input"
        placeholder="Withdraw Amount"
        value={inputWithdrawValue} // Controlled component: value is derived from state
        onChange={handleWithdrawInputChange} // Update state on every input change
        required
      />
      <button type="submit" className="withdraw-button">
        Withdraw
      </button>
    </form>
    </>
  )
}

export default FunctionalComponents