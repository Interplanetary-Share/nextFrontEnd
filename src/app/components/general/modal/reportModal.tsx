import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import { useState } from 'react'

const CheckBoxContainer = ({
  name,
  checked,
  value,
}: {
  name: string
  checked: boolean
  value: string
}) => {
  return (
    <label className="label cursor-pointer">
      <span className="label-text">{name}</span>
      <input
        defaultChecked={checked}
        type="checkbox"
        className="toggle toggle-error"
        name={value}
        value={value}
      />
    </label>
  )
}

const ReportModal = () => {
  const dispatch = useDispatch()
  const { id } = useSelector((state: any) => state.user)

  const [reportReason, setReportReason] = useState([
    {
      name: 'Self harm and Injuries',
      checked: false,
      value: 'self-harm-and-injuries',
    },
    {
      name: 'Pornography or sexually explicit content',
      checked: false,
      value: 'pornography-or-sexually-explicit-content',
    },
    {
      name: 'Ilegal Content or activity',
      checked: false,
      value: 'ilegal-content-or-activity',
    },
    {
      name: 'Hate Speech or incitement of violence',
      checked: false,
      value: 'hate-speech-or-incitement-of-violence',
    },
    {
      name: 'Spam, Trolling, Virus',
      checked: false,
      value: 'spam-trolling-virus',
    },
    {
      name: 'Other',
      checked: false,
      value: 'other',
    },
  ])

  const [comments, setComments] = useState('')
  const reportFound = false

  const handleReport = async (e: any) => {
    e.preventDefault()
    toast.success('Report Created, Thank you!')
  }

  return (
    <>
      <input type="checkbox" id="reportModal" className="modal-toggle" />
      <label
        htmlFor="reportModal"
        className="modal cursor-pointer mx-auto text-center"
      >
        <label className="modal-box relative text-white" htmlFor="">
          {reportFound ? (
            <>
              <div className="alert alert-info shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current flex-shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>
                    Thanks, You have already reported this content. We will
                    review it and take the appropriate action.
                  </span>
                </div>
              </div>

              <div className=" text-xl font-medium m-4">Edit Report</div>

              <p>
                <div id="reportForm" className="form-control">
                  {reportReason.map((reason, index) => {
                    const { name, value, checked } = reason
                    return (
                      <CheckBoxContainer
                        key={index}
                        name={name}
                        value={value}
                        checked={checked}
                      />
                    )
                  })}
                  <textarea
                    id="reportComments"
                    onChange={(e) => setComments(e.target.value)}
                    className="textarea textarea-ghost"
                    placeholder="Extra comments"
                    defaultValue={comments}
                  ></textarea>
                </div>
              </p>
              <br></br>
              <button onClick={handleReport} className="btn btn-wide">
                <span>{reportFound ? 'Update Report' : 'Report Content'}</span>
              </button>
              <ul className="menu menu-compact bg-base-100 w-full p-2 rounded-box">
                <li>
                  <a>Terms of Use & Content policy</a>
                </li>
                <li>
                  <a href="mailto:kenneth7e7a@gmail.com">Contact us</a>
                </li>
                <li>
                  <a>How InterPlanetary Share works?</a>
                </li>
              </ul>
            </>
          ) : (
            <>
              <h3 className="text-lg ">
                <b>Report Content:</b>
                <br></br>
                <span id="reportModalTitle"></span>
              </h3>

              <p className="text-md my-8">
                It&lsquo;s hard to control the content the users upload to IPFS,
                so we need your help to keep the content safe and clean. If you
                find any content that you think is inappropriate, please report
                it to us. We will review the content and take the appropriate
                action.
              </p>

              <br></br>
              <p>
                <div id="reportForm" className="form-control">
                  {reportReason.map((reason, index) => {
                    const { name, value, checked } = reason
                    return (
                      <CheckBoxContainer
                        key={index}
                        name={name}
                        value={value}
                        checked={checked}
                      />
                    )
                  })}
                  <textarea
                    onChange={(e) => setComments(e.target.value)}
                    className="textarea textarea-ghost"
                    placeholder="Extra comments"
                    id="reportComments"
                    defaultValue={comments}
                  ></textarea>
                </div>
              </p>
              <br></br>
              <button onClick={handleReport} className="btn btn-wide">
                <span>Report</span>
              </button>
              <ul className="menu menu-compact bg-base-100 w-full p-2 rounded-box">
                <li>
                  <a>Terms of Use & Content policy</a>
                </li>
                <li>
                  <a href="mailto:kenneth7e7a@gmail.com">Contact us</a>
                </li>
                <li>
                  <a>How InterPlanetary Share works?</a>
                </li>
              </ul>
            </>
          )}
        </label>
      </label>
    </>
  )
}

export default ReportModal
