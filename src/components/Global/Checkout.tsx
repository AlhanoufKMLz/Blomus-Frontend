import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import { createOrderThunk } from '../../redux/slices/orders/orderSlice'
import { ShippingInfo } from '../../types/types'
import { applyDiscount, calculatePrice } from '../../redux/slices/cart/cartSlice'
import { fetchSingleDiscountCodeThunk } from '../../redux/slices/discountCode/discountCodeSlice'

export default function () {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const cart = useSelector((state: RootState) => state.cart)
  const discount = useSelector((state: RootState) => state.discountCodes.code)

  const [discountCode, setDiscountCode] = useState('')
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    country: '',
    city: '',
    address: ''
  })

  // calculate price
  useEffect(() => {
    dispatch(calculatePrice())
  }, [cart.items])

  // handle discount
  const handleChangeDiscountCode = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value)
  }
  const handleApplyDiscount = () => {
    dispatch(fetchSingleDiscountCodeThunk(discountCode))
    discount && dispatch(applyDiscount({ discount }))
  }

  // handle checkout
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo({ ...shippingInfo, [name]: value })
  }
  const handleCheckOut = () => {
    dispatch(createOrderThunk(shippingInfo)).then((res) => {
      if(res.meta.requestStatus === 'fulfilled'){
        navigate('/thank-you')
      } 
    })
  }

  return (
    <div>
      <div className="bg-white rounded-lg p-10 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-primary_green text-xl">SUMMARY</h2>
          <div className="flex justify-between text-primary_pink">
            <span>Subtotal</span>
            <span>{cart.totalPrice}</span>
          </div>
          <div className="flex justify-between text-primary_pink">
            <span>Shipping</span>
            <span>{cart.shippingFee}</span>
          </div>
          <div className="flex justify-between text-primary_pink">
            <span>Taxes</span>
            <span>{cart.taxes}</span>
          </div>
          <div className="flex justify-between text-primary_pink">
            <span>Discount</span>
            <span>-{cart.savedAmount}</span>
          </div>
          <div className="flex justify-between text-primary_pink border-y-2 border-zinc_secondery font-bold">
            <span>Total</span>
            <span>{cart.finalTotal}</span>
          </div>
        </div>
        <details>
          <summary className="text-primary_green">Add address</summary>
          {/* country container */}
          <div className="relative flex items-center mt-2">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-primary_green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="text"
              id="country"
              name="country"
              onChange={handleChange}
              className="block w-full py-2 border border-primary_grey rounded-lg px-11"
              placeholder="Country"
            />
          </div>
          {/* city container */}
          <div className="relative flex items-center mt-2">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-primary_green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="text"
              id="city"
              name="city"
              onChange={handleChange}
              className="block w-full py-2 border border-primary_grey rounded-lg px-11"
              placeholder="City"
            />
          </div>
          {/* address container */}
          <div className="relative flex items-center mt-2">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-primary_green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="text"
              id="address"
              name="address"
              onChange={handleChange}
              className="block w-full py-2 border border-primary_grey rounded-lg px-11"
              placeholder="Address"
            />
          </div>
        </details>

        <div className="flex justify-between">
          <input
            className="block w-full py-2 border border-primary_grey px-6 rounded-l-lg text-sm focus:outline-none"
            type="code"
            name="code"
            placeholder="Coupon code"
            onChange={handleChangeDiscountCode}
          />
          <button
            onClick={handleApplyDiscount}
            className="bg-primary_green p-2 rounded-r-lg text-secondary_grey shadow-lg hover:shadow-none hover:bg-secondary_grey hover:text-primary_green">
            Apply
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="bg-primary_pink p-2 rounded-lg text-secondary_grey shadow-md hover:shadow-none hover:bg-secondary_grey hover:text-primary_pink shadow-shadow"
            onClick={handleCheckOut}>
            Check Out
          </button>
          <Link
            to={'/products'}
            className="bg-primary_green p-2 text-center rounded-lg text-secondary_grey shadow-md hover:shadow-none hover:bg-secondary_grey hover:text-primary_green shadow-shadow">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
