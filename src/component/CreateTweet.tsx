import * as React from 'react';

import * as Redux from 'react-redux';

import * as ActionTypes from '../store/actions/Tweet';

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';

interface ICreateTweet {
    id: number;
    commentMessage: string;
    comments: [{ id: number, value: string }];
    createTweet: any;
}

let id = 1;
const TweetUI = (props: ICreateTweet) => {

    //  React Hook useState instead of state
    const [commentMessage, setCommentMessage] = React.useState('');

    const handleChange = (event: any) => {

        // set data Using Hook
        setCommentMessage(event.target.value);
    }

    const handlePostComment = (event: any) => {
        // prevent default submit 
        event.preventDefault();
        let listComments = [];

        // Don't post message if it is blank 
        if (commentMessage) {
            listComments = [...props.comments, { id: id++, value: commentMessage }];
            props.createTweet(listComments);

            // After submit Clear textarea
            setCommentMessage('');
        }
    }

    return (
        <div className='text-wrapper align-center'>
            <Card className='card'>
                <CardContent>
                    <textarea onChange={handleChange}>{commentMessage}</textarea>
                    <Button variant="outlined" color='secondary' type="submit" onClick={handlePostComment}>Post a tweet</Button>
                </CardContent>
            </Card>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const comments = state.commentMessages
    return { comments }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        createTweet: (value: any) => dispatch({ type: ActionTypes.ADD_TWEET, value })
    }
};

export default Redux.connect(mapStateToProps, mapDispatchToProps)(TweetUI);
