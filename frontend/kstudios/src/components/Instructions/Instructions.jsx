import React from "react";
import "./Instructions.css";
import Navbar2 from '../Navbar2/Navbar2';

const Instructions = () => {
  return (
    <>
      <header>
        <Navbar2 />
      </header>
      <main>
        <div className="instructions_body">
          <div className="instructions_box">
            <div className="instructions_head">
              <h1>Terms and Conditions</h1>
            </div>
            <div className="instructions_info">
              <h6>
                Please read carefully all the mentioned rules and regulations
              </h6>
              <ul className="instructions_list">
                <li>
                  The studio shall be used only for mutually agreed activity.
                  Any change of activity requires prior written consent.
                </li>
                <li>
                  If a session needs to be cancelled or rescheduled, prior
                  notice must be given either on mail atleast 3 days prior.
                </li>
                <li>
                  Booking can be done minimum 1 hour before but{" "}
                  <b>Cancellation won't be allowed.</b>
                </li>
                <li>
                  <b>
                    Id/Address Proof to be submitted for booking the studio on
                    the day of activity.
                  </b>
                </li>
                <li>
                  The User shall not sublet or share the space with any third
                  party.
                </li>
                <li>Studio must be kept clean and tidy after each session.</li>
                <li>
                  <b>Extended use may result in extra charges.</b>
                </li>
                <li>No footwear is allowed on the premises.</li>
                <li>
                  <b>
                    No smooking, alcohol, or illegal subtances allowed on
                    premises.
                  </b>
                </li>
                <li>
                  <b>
                    User must ensure their own safety and that of their
                    participants.
                  </b>
                  First aid is available, but Studio Provider is not responsible
                  for any personal injuries
                </li>
                <li>
                  Parking is limited - please use available space responsibly.
                </li>
                <li>
                  <b>
                    Studio is not responsible to provide any additional setup.
                  </b>
                </li>
                <li>
                  Users are expected to maintain decorum and mutual respect if
                  other users are present before/after the slot.
                </li>
                <li>
                  <b>
                    No public shaming, verbal abuse, or inappropriate behaviour
                    will be tolerated.
                  </b>
                </li>
                <li>
                  <b>
                    User is solely responsible for any legal or civil liability
                    that may arise due to their activities or participants.
                  </b>
                </li>
                <li>
                  <b>
                    Repeated short-notice cancellations may lead to changes in
                    your studio schedule.
                  </b>
                </li>
                <li>
                  Media, Photography & Promotions
                  <ol>
                    <li>
                      Prior permission is required to film or photograph inside
                      the studio.
                    </li>
                    <li>
                      Content shot inside the studio must credit the studio if
                      venue is visible.
                    </li>
                    <li>
                      The Studio Provider is not responsible for securing
                      participant consent - user must handle this directly.
                    </li>
                  </ol>
                </li>
                <li>
                  Visitors & Outsiders
                  <ol>
                    <li>
                      Only authorized members/students may enter the studio
                      space during your slot.
                    </li>
                    <li>
                      Visitors or outsiders accompanying participants are not
                      allowed inside without prior approval.
                    </li>
                    <li>
                      They can wait in waiting area outside the studio. Waiting
                      area must be used respectfully.
                    </li>
                  </ol>
                </li>
                <li>
                  <b>Legal & Final Terms</b>
                  <ol>
                    <li>
                      Studio Provider holds the right to modify or cancel studio
                      use at any time due to emergencies, legal issues or misuse
                      of space.
                    </li>
                    <li>
                      Misuse of space or repeated violations may result in
                      cancellation of further use.
                    </li>
                    <li>
                      This space is for peaceful, creative, and respectful use.
                      Let's work together to keep it safe and welcoming for all.
                    </li>
                  </ol>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Instructions;
