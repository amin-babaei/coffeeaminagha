import { Fragment } from "react";
import SingleComment from "./SingleComment";
import { Box } from "@mui/material";

const ReplyComment = ({ parentCommentId, comments, productId }) => {
    return comments.map((comment) => {
      return (
        parentCommentId === comment.responseTo && (
          <Box mt={-3} ml={2} key={comment._id}>
            <Fragment key={comment._id}>
              <SingleComment comment={comment} productId={productId} />
              <ReplyComment comments={comments} parentCommentId={comment._id} productId={productId} />
            </Fragment>
          </Box>
        )
      );
    });
  };

export default ReplyComment