import { connect } from 'react-redux';
import { composeTweet } from '../../actions/tweet_actions';
import TweetCompose from './tweet_compose';

const mSP = (state) => {
  return {
    currentUser: state.session.user,
    newTweet: state.tweets.new
  };
};

const mDP = dispatch => {
  return {
    composeTweet: data => dispatch(composeTweet(data))
  };
};

export default connect(mSP, mDP)(TweetCompose);
