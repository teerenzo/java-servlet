import React from 'react'
import Footer from './includes/footer';

export default function landing() {
  return (
    <div>
       <section class="bg-land flex h-full items-center px-10">

<div class="w-full md:w-1/3">

  <p class="text-white text-6xl font-bold">E-hostpital. </p>

  <div>

  <p class="text-white text-2xl font-bold">We are here to listen to you and help you.</p>

  <div class="flex gap-10">
 <a href="/login"> <button class="bg-[#015AAB] text-white px-5 py-3  mt-5">What Help?</button>
 
</a>

<a href="/login">    <button class="border border-2 border-[#015AAB] text-white px-5 py-3  mt-5">Free Consultation</button>
</a>


  </div>
      
  </div>
</div>

</section>
<Footer/>
    </div>
  )
}
