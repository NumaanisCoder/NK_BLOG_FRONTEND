import React from 'react';

const WhatsAppShareButton = ({ shareUrl }) => {
  const handleWhatsAppShare = () => {
    const message = `Check out this blog: ${shareUrl}`;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <><i class="fa-solid fa-share"></i><button style={{backgroundColor: "transparent", color: "green", borderRadius: 5, padding: 5, borderColor: "green"}} onClick={handleWhatsAppShare}>Share On <i style={{fontSize: 15}}class="fa-brands fa-whatsapp"></i></button></>
  );
};

export default WhatsAppShareButton;
