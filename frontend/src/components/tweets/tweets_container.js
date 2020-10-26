import { connect } from 'react-redux';
import { fetchTweets } from '../../actions/tweet_actions';
import Tweets from './tweets';

const mSP = (state) => {
  return {
    tweets: Object.values(state.tweets.all)
  };
};

const mDP = dispatch => {
  return {
    fetchTweets: () => dispatch(fetchTweets())
  };
};

export default connect(mSP, mDP)(Tweets);