import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSlots } from '../../actions/slot';

const Loading = require('react-loading-animation');

const Landing = ({ slot: { loading, slots }, getSlots }) => {
  useEffect(() => {
    getSlots();
  }, [getSlots]);

  return (
    <Fragment>
      <h1 className='large text-primary'>Our Instructors</h1>
      <p className='lead'>Browse and connect with our Instructors</p>
      {loading ? (
        <Loading />
      ) : (
        <div className='profiles'>
          {slots.length > 0 ? (
            slots.map((slot) => (
              <div className='profile bg-light'>
                <img
                  className='round-img'
                  src='https://www.gravatar.com/avatar/be13324f6e3a5e3663799bf641748626?s=200&r=pg&d=mm'
                  alt=''
                />
                <div>
                  <h2>{slot.name}</h2>
                  <p>{slot.status}</p>
                  <p className='my-1'>India</p>
                  <Link to={`/book/${slot._id}`} className='btn btn-primary'>
                    Book a Meeting
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <h4>No Profile Found</h4>
          )}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  slot: state.slot,
});

export default connect(mapStateToProps, { getSlots })(Landing);
