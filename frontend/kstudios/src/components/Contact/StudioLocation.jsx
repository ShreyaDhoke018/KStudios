import React from 'react'

const StudioLocation = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <iframe
        title="Studio Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d607.1710005380231!2d72.84614166203032!3d19.203261968232543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b75b028b64f3%3A0xcf7881f5f43f8954!2sK%20Studios!5e0!3m2!1sen!2sin!4v1753800412146!5m2!1sen!2sin"
        width="600"
        height="450"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-xl shadow-md border"
      ></iframe>
    </div>
  );
}

export default StudioLocation
