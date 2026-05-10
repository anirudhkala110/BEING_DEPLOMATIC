import React from 'react'

const Footer4 = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6'>
                    <p className='fs-5 fw-semibold' style={{ color: '#B3E6FF' }}>Follow us on</p>
                    <span className='d-flex align-items-center'>
                        <a href='https://www.linkedin.com/company/being-diplomatic-byharshesh/' target='_blank'>
                            <i className='me-4 fs-5 text-white bi bi-linkedin'></i>
                        </a>
                        <a href='https://www.youtube.com/@beingdiplomatic' target='_blank'>
                        <i className='me-4 fs-2 text-white bi bi-youtube'></i>
                        </a>
                        <a href='https://www.instagram.com/diplomatic_being?igsh=MWU3ZzF0amc1ZTczcw==' target='_blank'>
                            <i className='me-4 fs-5 text-white bi bi-instagram'></i>
                        </a>
                        <a href='https://in.pinterest.com/beingdiplomatic/' target='_blank'>
                            <i className='me-4 fs-5 text-white bi bi-pinterest'></i>
                        </a>
                        <a href='https://www.facebook.com/people/Being-Diplomatic/61553373556653/' target='_blank'>
                            <i className='me-4 fs-5 text-white bi bi-facebook'></i>
                        </a>
                    </span>
                </div>
                <div className='col-6 text-end'>
                    <p className='fw-semibold mb-3' style={{ color: '#B3E6FF' }}>Job Enquiry:</p>
                    <p className='fw-semibold mb-3' style={{ color: '#B3E6FF' }}>We are hiring! Apply Now</p>
                    {/* <p className='fw-semibold mb-3 text-decoration-underline' style={{ color: '#B3E6FF' }}><a href='#'>careers@lunarlogic.com</a></p> */}
                    <p className='fw-semibold mb-3' style={{ color: '#B3E6FF' }}><a href='#'>Being Diplomatic <sup><i className='bi bi-c-circle'></i></sup> 2024 Copyright LL</a></p>
                    <a href='/privacy_and_policy' className='text-info'>Privacy & Policy</a>
                    <input type='hidden' value='Created By #anirudhkala110@gmail.com' />
                </div>
            </div>
        </div>
    )
}

export default Footer4