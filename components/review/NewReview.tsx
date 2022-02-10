import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { checkReviewAvailability, clearErrors, newReview } from "../../redux/actions/roomActions";
import { NEW_REVIEW_RESET } from "../../redux/constants/roomConstant";

const NewReview = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState(" ");

    const dispatch = useDispatch();
    const router = useRouter();

    const { error, success } = useSelector((state: any) => state.newReview);
    const { reviewAvailable } = useSelector((state: any) => state.checkReview);

    const { id } = router.query;

    useEffect(() => {
        if (id !== undefined) {
            dispatch(checkReviewAvailability(id));
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Review is posted.");
            dispatch({ type: NEW_REVIEW_RESET })
        }
    }, [dispatch, error, success, id]);

    const submitHandler = () => {
        const reviewData = {
            rating, comment, roomId: id
        }

        dispatch(newReview(reviewData));
    }

    function setUserRatings() {

        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            //@ts-ignore
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings)
            })
        })

        function showRatings(e: any) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    //@ts-ignore
                    if (index < this.starValue) {
                        star.classList.add('red')
                        //@ts-ignore
                        setRating(this.starValue)
                    } else {
                        star.classList.remove('red')
                    }
                }
                if (e.type === 'mouseover') {
                    //@ts-ignore
                    if (index < this.starValue) {
                        star.classList.add('light-red')

                    } else {
                        star.classList.remove('light-red')
                    }

                }

                if (e.type === 'mouseout') {
                    star.classList.remove('light-red')
                }

            })
        }

    }
    const setUserRating = () => {
        const stars = document.querySelectorAll(".star");
        const showRating = (e: any) => {
            stars.forEach((star, index) => {
                if (e.type == "click") {
                    //@ts-ignore
                    if (index < star.starValue) {
                        star.classList.add("red");
                        //@ts-ignore
                        setRating(star.starValue);
                    }
                    else {
                        star.classList.remove("red");
                    }
                }

                if (e.type == "mouseover") {
                    //@ts-ignore
                    if (index < star.starValue) {
                        star.classList.add("light-red");
                    }
                    else {
                        star.classList.remove("light-red");
                    }
                }

                if (e.type == "mouseout") {
                    star.classList.remove("light-red");
                }
            });
        }
        stars.forEach((star, index) => {
            //@ts-ignore
            star.starValue = index + 1;

            ["click", "mouseover", "mouseout"].forEach(e => {
                star.addEventListener(e, showRating);
            })
        })


    }

    return (
        <>
            {reviewAvailable && (
                <button id="review_btn" type="button" className="btn btn-primary mt-4 mb-5" data-toggle="modal" data-target="#ratingModal"
                    onClick={setUserRatings}
                >
                    Submit Your Review
                </button>
            )}


            <div className="modal fade" id="ratingModal" tabIndex={-1} role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ul className="stars">
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                            </ul>

                            <textarea name="review" id="review" className="form-control mt-3" value={comment} onChange={(e) => setComment(e.target.value)}> </textarea>

                            <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close" onClick={submitHandler}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewReview;