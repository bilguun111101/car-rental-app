import React, { useState } from 'react';

const ContactDetails = (props: any) => {
  const { lastName, setLastName, firstName, setFirstName, phone, setPhone } =
    props.states;

  return (
    <div className=''>
      <div className='flex flex-col md:px-5 items-center justify-center md:flex-row md:justify-between bg-white dark:bg-dark-secondary dark:border-none rounded border border-gray-300'>
        <div className='card-body p-4'>
          <h4 className='card-title text-base md:text-2xl mt-6 dark:text-gray-secondary'>
            Холбоо барих
          </h4>
          <div className='h-0.5 w-full bg-primary'></div>
          <div className='flex flex-col justify-between md:flex-row'>
            <div className='form-control w-[150px] sm:w-full'>
              <label className='label'>
                <span className='label-text font-semibold dark:text-gray-secondary text-xs md:text-sm'>
                  Нэр
                </span>
              </label>
              <input
                type='text'
                placeholder='Нэр'
                className='input bg-white border border-gray-300 rounded focus:outline-primary placeholder:text-xs dark:bg-transparent dark:text-gray-secondary'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='form-control w-[150px] sm:w-full md:ml-4'>
              <label className='label'>
                <span className='label-text font-semibold dark:text-gray-secondary text-xs md:text-sm '>
                  Овог
                </span>
              </label>
              <input
                type='text'
                placeholder='Овог'
                className='input bg-white border border-gray-300 rounded focus:outline-primary placeholder:text-xs dark:bg-transparent dark:text-gray-secondary'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className='form-control w-[150px] sm:w-full md:mt-6'>
            <label className='label'>
              <span className='label-text font-semibold dark:text-gray-secondary text-xs md:text-sm'>
                Утас
              </span>
            </label>
            <input
              type='number'
              placeholder='Утас'
              className='input w-full bg-white border border-gray-300 rounded focus:outline-primary placeholder:text-xs dark:bg-transparent dark:text-gray-secondary'
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
          {/*  =============== checkbox ============= */}
          <div className='form-control w-full mt-2'>
            <label className='label'>
              <span className='label-text text-xs sm:text-sm font-semibold dark:text-gray-400'>
                Would you like to receive SMS notifications from Enterprise
                about this rental?
              </span>
            </label>
            <div className='flex flex-col gap-4 mt-6'>
              <label className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='radio-8'
                  className='radio radio-error w-4 h-4 sm:h-6 sm:w-6'
                  checked
                />
                <span className='label-text text-[12px] sm:text-xs leading-4 text-gray-700 dark:text-gray-500'>
                  Yes, I would like to receive text messages about this rental
                  to the phone number on this reservation
                </span>
              </label>
              <label className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='radio-8'
                  className='radio radio-error  w-4 h-4 sm:h-6 sm:w-6'
                />
                <span className='label-text text-[12px] sm:text-xs leading-4 text-gray-700 dark:text-gray-500'>
                  No, By selecting {'Yes'} above, message and data rates may
                  apply. Message frequency varies and depends on the activity of
                  your reservation.
                </span>
              </label>
            </div>
            {/*  ================ sign-up checkbox =============== */}
            <div className='flex mt-10 items-center gap-4'>
              <input
                type='checkbox'
                name='checkbox'
                className='w-4 h-4 sm:h-5 sm:w-5'
              />
              <span className='label-text text-xs text-gray-700 dark:text-gray-500 '>
                Sign up for Car Rental Email Specials
              </span>
            </div>
            <span className='mt-2 ml-9 mb-10 text-[10px] sm:text-xs text-gray-700 dark:text-gray-500'>
              By selecting this box, you would like to receive our latest
              benefits and updates from Car Rental and its affiliates. Note that
              your email interactions can be used to perform analytics and
              produce content and ads tailored to your interest. Some of these
              offers will be received in advertising on non-Car Rental sites,
              including on social media and digital advertising platforms.
              Please understand that there is no charge and that you can
              unsubscribe at any time by (i) using the links provided in the
              emails, (ii) managing your preferences in your Car Rental Plus
              profile or (iii) contacting us. Please consult our Privacy Policy
              and our Cookie Policy to find out more.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactDetails;
