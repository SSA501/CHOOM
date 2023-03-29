import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import * as poseDetection from "@tensorflow-models/pose-detection";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface Pose {
  keypoints: poseDetection.Keypoint[];
}
export interface Score {
  score: number;
  time: number;
}
export interface Challenge {
  status: number;
  videoPath: string;
  jsonPath: string;
}
