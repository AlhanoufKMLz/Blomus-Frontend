import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AppDispatch } from '../redux/store'
import { Product } from '../types/types'
import { addToCartThunk, fetchCartItemsThunk } from '../redux/slices/cart/cartSlice'
import { fetchBestSellingProductsThunk } from '../redux/slices/products/productSlice'
import { addToWishlistThunk } from '../redux/slices/wishlist/wishlistSlice'
import { fetchCategoriesThunk } from '../redux/slices/categories/categorySlice'
import BestSellers from '../components/Global/BestSellers'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    Promise.all([dispatch(fetchCategoriesThunk()), dispatch(fetchCartItemsThunk())])
  }, [])

  return (
    <div className="min-h-screen items-start">
      {/* hero */}
      <div className="relative flex items-start mb-48">
        <img className="w-60 rounded-b-full" src="https://sda-ecommerce.s3.eu-north-1.amazonaws.com/1703646482062-h1.JPG" />
        <img className="w-52 rounded-b-full" src="https://sda-ecommerce.s3.eu-north-1.amazonaws.com/1703646673497-h3.JPG" />
        <img className="w-64 rounded-b-full" src="https://sda-ecommerce.s3.eu-north-1.amazonaws.com/1703646769168-h5.JPG" />
        <img className="w-48 rounded-b-full" src="https://sda-ecommerce.s3.eu-north-1.amazonaws.com/1703646819191-h6.JPG" />
        <div className="absolute top-48 left-2/4 flex flex-col gap-3 text-right items-end">
          <h1 className="text-4xl text-primary_pink font-bold">
            Let Your Space Shine Bright: <br />
            Candles and Diffusers for Pure Delight!
          </h1>
          <Link
            to={'/products'}
            className="bg-primary_green p-3 min-w-fit text-center w-2/12 text-2xl rounded-lg text-secondary_grey shadow-md hover:shadow-none hover:bg-secondary_grey hover:text-primary_green shadow-shadow">
            Start Shopping
          </Link>
        </div>
      </div>

      <div className="flex justify-around gap-6 bg-primary_grey bg-opacity-60 p-12 mb-36">
        <div className="flex flex-col items-center gap-3 group">
          <div className="flex justify-center items-center bg-primary_green w-32 h-32 rounded-full shadow-2xl hover:shadow-none group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80px"
              height="80px"
              viewBox="0 0 48 48"
              fill="none">
              <rect width="48" height="48" fill="white" fill-opacity="0.01" />
              <path
                d="M11 41.0001C15.1674 39.2093 19.0922 38.2431 22.7746 38.1015C26.457 37.9598 31.1988 38.5927 37 40.0001"
                stroke="#be9995"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <path
                d="M23.0452 44C22.2783 34.5599 22.5964 27.2266 23.9997 22"
                stroke="#be9995"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24 23.176C25.59 17.1581 28.3898 13.5692 32.3992 12.4095C36.4086 11.2497 40.2755 11.7812 43.9998 14.004C44.0186 18.8959 41.8952 22.4796 37.6296 24.755C33.364 27.0305 28.8208 26.5041 24 23.176Z"
                stroke="#be9995"
                stroke-width="2.5"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.7919 22.1141C24.6253 14.9273 22.9554 9.86554 18.7822 6.92866C14.6089 3.99178 9.77638 3.336 4.28447 4.96133C3.32535 11.5907 4.79153 16.6036 8.68299 20C12.5745 23.3964 17.6108 24.1011 23.7919 22.1141Z"
                stroke="#be9995"
                stroke-width="2.5"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="hidden group-hover:block bg-white p-4 rounded-lg">
            <h2 className="text-primary_pink w-96">
              Experience the purity of candles made from organic materials. We source the finest
              ingredients from nature, ensuring a clean and eco-friendly burning experience.
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 group">
          <div className="flex justify-center items-center bg-primary_pink w-32 h-32 rounded-full shadow-2xl hover:shadow-none group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="#727E7E"
              height="80px"
              width="80px"
              version="1.1"
              id="Capa_1"
              viewBox="0 0 471.554 471.554"
              xmlSpace="preserve">
              <g id="XMLID_228_">
                <path
                  id="XMLID_229_"
                  d="M386.561,273.478l-51.073-34.475c-5.954-27.575-48.877-41.107-91.399-42.637v-0.254v-35.885   c0-4.504-3.647-8.151-8.151-8.151c-4.507,0-8.151,3.647-8.151,8.151v35.885v0.254c-42.414,1.522-85.191,14.982-91.369,42.397   l-51.424,34.715c-24.677,16.646-32.272,49.538-17.385,75.313l54.495,94.417c10.126,17.545,28.85,28.347,49.099,28.347H300.35   c20.252,0,38.974-10.802,49.1-28.347l54.496-94.417C418.833,323.015,411.239,290.123,386.561,273.478z M227.786,229.091v8.287   c0,4.506,3.645,8.151,8.151,8.151c4.504,0,8.151-3.645,8.151-8.151v-8.287c34.801,1.433,55.212,11.472,59.145,16.559   c-4.235,5.484-27.384,16.844-67.296,16.844c-39.931,0-63.095-11.36-67.329-16.844C172.541,240.563,192.967,230.524,227.786,229.091   z M375.704,332.488l-54.497,94.425c-4.282,7.419-12.274,12.036-20.857,12.036H171.202c-8.58,0-16.573-4.617-20.855-12.044   l-54.513-94.417c-6.288-10.897-3.041-24.94,7.402-31.984l44.275-29.891c18.119,16.653,54.146,24.487,88.425,24.487   c34.181,0,70.129-7.794,88.263-24.368l44.132,29.78C378.76,307.548,382.008,321.591,375.704,332.488z"
                />
                <path
                  id="XMLID_233_"
                  d="M209.46,184.912c-5.365-6.177-8.724-14.146-8.724-22.966c0-19.439,30.996-44.22,35.185-66.182   c4.871,22.178,35.201,46.743,35.201,66.182c0,8.82-3.36,16.789-8.709,22.966c26.683-10.572,45.611-36.482,45.611-66.931   c0-33.265-43.402-73.886-63.461-112.845c-3.542-6.878-13.422-6.838-16.924,0.059c-19.671,38.738-63.824,79.581-63.824,112.786   C163.815,148.438,182.76,174.34,209.46,184.912z"
                />
                <path
                  id="XMLID_234_"
                  d="M157.717,399.244c6.959,12.067,19.838,19.501,33.785,19.501h88.884c13.947,0,26.826-7.434,33.784-19.51   l10.046-17.41H147.673L157.717,399.244z"
                />
              </g>
            </svg>
          </div>
          <div className="hidden group-hover:block bg-white p-4 rounded-lg">
            <h2 className="text-primary_pink w-96">
              Immerse yourself in the soothing scents inspired by nature's bounty. Our candles offer
              not just light but a sensory journey, transforming your surroundings into a haven of
              relaxation.
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 group">
          <div className="flex justify-center items-center bg-primary_green w-32 h-32 rounded-full shadow-2xl hover:shadow-none group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80px"
              height="80px"
              viewBox="0 0 24 24"
              fill="none">
              <path
                d="M10.8613 3.36335C11.3679 2.45445 11.6213 2 12 2C12.3787 2 12.6321 2.45445 13.1387 3.36335L13.2698 3.59849C13.4138 3.85677 13.4858 3.98591 13.598 4.07112C13.7103 4.15633 13.8501 4.18796 14.1296 4.25122L14.3842 4.30881C15.3681 4.53142 15.86 4.64273 15.977 5.01909C16.0941 5.39546 15.7587 5.78763 15.088 6.57197L14.9144 6.77489C14.7238 6.99777 14.6285 7.10922 14.5857 7.24709C14.5428 7.38496 14.5572 7.53364 14.586 7.83102L14.6122 8.10176C14.7136 9.14824 14.7644 9.67148 14.4579 9.90409C14.1515 10.1367 13.6909 9.92462 12.7697 9.50047L12.5314 9.39073C12.2696 9.2702 12.1387 9.20994 12 9.20994C11.8613 9.20994 11.7304 9.2702 11.4686 9.39073L11.2303 9.50047C10.3091 9.92462 9.84847 10.1367 9.54206 9.90409C9.23565 9.67148 9.28635 9.14824 9.38776 8.10176L9.41399 7.83102C9.44281 7.53364 9.45722 7.38496 9.41435 7.24709C9.37147 7.10922 9.27617 6.99777 9.08557 6.77489L8.91204 6.57197C8.2413 5.78763 7.90593 5.39546 8.02297 5.01909C8.14001 4.64273 8.63194 4.53142 9.61581 4.30881L9.87035 4.25122C10.1499 4.18796 10.2897 4.15633 10.402 4.07112C10.5142 3.98591 10.5862 3.85677 10.7302 3.59849L10.8613 3.36335Z"
                stroke="#be9995"
                stroke-width="1"
              />
              <path
                d="M19.4306 7.68168C19.684 7.22723 19.8106 7 20 7C20.1894 7 20.316 7.22722 20.5694 7.68167L20.6349 7.79925C20.7069 7.92839 20.7429 7.99296 20.799 8.03556C20.8551 8.07817 20.925 8.09398 21.0648 8.12561L21.1921 8.15441C21.684 8.26571 21.93 8.32136 21.9885 8.50955C22.047 8.69773 21.8794 8.89381 21.544 9.28598L21.4572 9.38744C21.3619 9.49889 21.3143 9.55461 21.2928 9.62354C21.2714 9.69248 21.2786 9.76682 21.293 9.91551L21.3061 10.0509C21.3568 10.5741 21.3822 10.8357 21.229 10.952C21.0758 11.0683 20.8455 10.9623 20.3849 10.7502L20.2657 10.6954C20.1348 10.6351 20.0694 10.605 20 10.605C19.9306 10.605 19.8652 10.6351 19.7343 10.6954L19.6151 10.7502C19.1545 10.9623 18.9242 11.0683 18.771 10.952C18.6178 10.8357 18.6432 10.5741 18.6939 10.0509L18.707 9.91551C18.7214 9.76682 18.7286 9.69248 18.7072 9.62354C18.6857 9.55461 18.6381 9.49889 18.5428 9.38744L18.456 9.28599C18.1206 8.89381 17.953 8.69773 18.0115 8.50955C18.07 8.32136 18.316 8.26571 18.8079 8.15441L18.9352 8.12561C19.075 8.09398 19.1449 8.07817 19.201 8.03556C19.2571 7.99296 19.2931 7.92839 19.3651 7.79925L19.4306 7.68168Z"
                stroke="#be9995"
                stroke-width="1"
              />
              <path
                d="M3.43063 7.68168C3.68396 7.22723 3.81063 7 4 7C4.18937 7 4.31604 7.22722 4.56937 7.68167L4.63491 7.79925C4.7069 7.92839 4.74289 7.99296 4.79901 8.03556C4.85513 8.07817 4.92503 8.09398 5.06482 8.12561L5.19209 8.15441C5.68403 8.26571 5.93 8.32136 5.98852 8.50955C6.04704 8.69773 5.87935 8.89381 5.54398 9.28598L5.45722 9.38744C5.36191 9.49889 5.31426 9.55461 5.29283 9.62354C5.27139 9.69248 5.27859 9.76682 5.293 9.91551L5.30612 10.0509C5.35682 10.5741 5.38218 10.8357 5.22897 10.952C5.07576 11.0683 4.84547 10.9623 4.38487 10.7502L4.2657 10.6954C4.13481 10.6351 4.06937 10.605 4 10.605C3.93063 10.605 3.86519 10.6351 3.7343 10.6954L3.61513 10.7502C3.15454 10.9623 2.92424 11.0683 2.77103 10.952C2.61782 10.8357 2.64318 10.5741 2.69388 10.0509L2.707 9.91551C2.72141 9.76682 2.72861 9.69248 2.70717 9.62354C2.68574 9.55461 2.63809 9.49889 2.54278 9.38744L2.45602 9.28599C2.12065 8.89381 1.95296 8.69773 2.01148 8.50955C2.07 8.32136 2.31597 8.26571 2.80791 8.15441L2.93518 8.12561C3.07497 8.09398 3.14487 8.07817 3.20099 8.03556C3.25711 7.99296 3.29311 7.92839 3.36509 7.79925L3.43063 7.68168Z"
                stroke="#be9995"
                stroke-width="1"
              />
              <path
                d="M5 20.3884H7.25993C8.27079 20.3884 9.29253 20.4937 10.2763 20.6964C12.0166 21.0549 13.8488 21.0983 15.6069 20.8138C16.4738 20.6734 17.326 20.4589 18.0975 20.0865C18.7939 19.7504 19.6469 19.2766 20.2199 18.7459C20.7921 18.216 21.388 17.3487 21.8109 16.6707C22.1736 16.0894 21.9982 15.3762 21.4245 14.943C20.7873 14.4619 19.8417 14.462 19.2046 14.9433L17.3974 16.3084C16.697 16.8375 15.932 17.3245 15.0206 17.4699C14.911 17.4874 14.7962 17.5033 14.6764 17.5172M14.6764 17.5172C14.6403 17.5214 14.6038 17.5254 14.5668 17.5292M14.6764 17.5172C14.8222 17.486 14.9669 17.396 15.1028 17.2775C15.746 16.7161 15.7866 15.77 15.2285 15.1431C15.0991 14.9977 14.9475 14.8764 14.7791 14.7759C11.9817 13.1074 7.62942 14.3782 5 16.2429M14.6764 17.5172C14.6399 17.525 14.6033 17.5292 14.5668 17.5292M14.5668 17.5292C14.0434 17.5829 13.4312 17.5968 12.7518 17.5326"
                stroke="#be9995"
                stroke-width="1"
                stroke-linecap="round"
              />
              <rect x="2" y="14" width="3" height="8" rx="1.5" stroke="#be9995" stroke-width="1" />
            </svg>
          </div>
          <div className="hidden group-hover:block bg-white p-4 rounded-lg">
            <h2 className="text-primary_pink w-96">
              Each candle is a masterpiece, carefully handcrafted to perfection. Our artisans pour
              their passion into every creation, infusing a touch of warmth and authenticity into
              your space.
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 group">
          <div className="flex justify-center items-center bg-primary_pink w-32 h-32 rounded-full shadow-2xl hover:shadow-none group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#727E7E"
              width="100px"
              height="100px"
              viewBox="0 0 512 512">
              <g id="Air_quality_control">
                <path d="M219.1,91.73A8.27,8.27,0,0,0,234,95.34l17.37-23.8A8.27,8.27,0,0,0,249.53,60L225.77,42.57a8.27,8.27,0,0,0-13.06,7.94l2,12.79A201.72,201.72,0,0,0,68.16,334.66l10,22.84H97.86l-13-29.61A183.65,183.65,0,0,1,217.46,81.12Z" />
                <path d="M454.27,335.67,442.85,331a200.78,200.78,0,0,0,13.37-72.31c0-96.13-68.37-179.31-162.57-197.79l-3.46,17.67c85.77,16.82,148,92.57,148,180.12a182.84,182.84,0,0,1-12,65.47l-10.51-4.31a8.26,8.26,0,0,0-10.76,10.84l11.39,27.18a8.27,8.27,0,0,0,10.81,4.43L454.31,351A8.27,8.27,0,0,0,454.27,335.67Z" />
                <path d="M341.78,183.14c-18.91-.91-54.39,1.23-79.66,25.6a80.14,80.14,0,0,0-7.46,8.27,80,80,0,0,0-7.45-8.27c-25.28-24.37-60.76-26.51-79.67-25.6a24.13,24.13,0,0,0-23.06,23.07c-.9,18.9,1.23,54.38,25.6,79.66,17.44,18.09,42.87,27.54,75.6,28.18v80.4H174.35v18H334.42v-18H263.68v-80.4c32.71-.65,58.13-10.1,75.57-28.18,24.37-25.28,26.5-60.76,25.6-79.66A24.15,24.15,0,0,0,341.78,183.14ZM162.46,207.06a6.22,6.22,0,0,1,5.94-5.94c16-.77,45.9.9,66.31,20.58,14.19,13.67,21.77,34.17,22.64,61-13.91-29-41.94-38.26-43.37-38.71l-5.15,16.2c.29.09,26,8.61,35.62,35.87-27-.79-47.67-8.4-61.41-22.65C163.36,253,161.7,223.06,162.46,207.06Z" />
              </g>
            </svg>
          </div>
          <div className="hidden group-hover:block bg-white p-4 rounded-lg">
            <h2 className="text-primary_pink w-96">
              Caring for the environment is at the heart of what we do. Our commitment to
              sustainability extends to our packaging, ensuring that your candle experience is not
              only delightful but also environmentally conscious.
            </h2>
          </div>
        </div>
      </div>

      {/* best selling products */}
      <BestSellers />
    </div>
  )
}
