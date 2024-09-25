import React from "react";

interface SideNavProps {
    isOpen: boolean;
    toggleSideNav: () => void;
}

export default function SideNav({ isOpen, toggleSideNav  }: SideNavProps  ) {

    return (
        <div className={`${isOpen ? 'open' : ''} side-nav`}>
            <button onClick={toggleSideNav}> close </button>
            <ul>
            <section className="home-catergories">
        <div className="audio-categories nav-categories">
          <div>
            <img
              src="/assets/shared/desktop/image-category-thumbnail-headphones.png"
              alt="thumdnail headphones"
            />
            <h5>Headphones</h5>
            <a href="">Shop</a>
          </div>
          <div>
            <img
              src="/assets/shared/desktop/image-category-thumbnail-speakers.png"
              alt="thumdnail speakers"
            />
            <h5>Speakers</h5>
            <a href="">Shop</a>
          </div>
          <div>
            <img
              src="/assets/shared/desktop/image-category-thumbnail-earphones.png"
              alt="thumdnail earphones"
            />
            <h5>Earphones</h5>
            <a href="">Shop</a>
          </div>
        </div>
      </section>
            </ul>
        </div>
    )
}