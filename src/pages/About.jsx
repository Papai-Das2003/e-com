import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=''/>
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque nihil maiores provident eum mollitia esse nulla odit eos consequatur ullam alias quibusdam voluptates accusantium soluta, qui quia, voluptatibus aspernatur! Iste!</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi ratione laboriosam saepe optio iure, quidem facere unde deserunt mollitia veniam ullam! Possimus dolor exercitationem totam quisquam magni impedit sit sapiente!</p>
      <b className='text-gray-800'>Our Mission</b>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est magnam tempora doloremque maiores odio error facilis dignissimos, adipisci quisquam esse ullam culpa reiciendis quas recusandae animi sunt doloribus deserunt voluptatibus.</p>
      </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About