import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiReportCreate, apiReportDelete } from '../../endpoints';
import { IInfoFile } from './infoFile.slice';

export const fetchCreateOrUpdateReport = createAsyncThunk(
  'infoFile/fetchCreateOrUpdateReport',
  async (data: any, { rejectWithValue, getState }) => {
    const { comments, reasons } = data;
    const { user, infoFile } = getState() as any;
    const { id: userId } = user;
    const { cid } = infoFile;

    if (!cid || cid === '') return rejectWithValue('CID is empty');
    if (!userId || userId === '') return rejectWithValue('User is empty');

    return await axios
      .post(apiReportCreate, {
        cid,
        userId,
        comments,
        reasons,
      })
      .then((res) => {
        const { reports } = res.data;
        return reports;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchCreateOrUpdateReportReducer = {
  [fetchCreateOrUpdateReport.pending as any]: (state: IInfoFile) => {
    state.fetchCreateOrUpdateReport.loading = true;
  },
  [fetchCreateOrUpdateReport.fulfilled as any]: (
    state: IInfoFile,
    action: any
  ) => {
    state.reports = action.payload;
    state.fetchCreateOrUpdateReport.loading = false;
  },
  [fetchCreateOrUpdateReport.rejected as any]: (
    state: IInfoFile,
    action: any
  ) => {
    state.fetchCreateOrUpdateReport.loading = false;
    state.fetchCreateOrUpdateReport.error = action.error.message;
  },
};

export const fetchDeleteReport = createAsyncThunk(
  'infoFile/fetchDeleteReport',
  async (data: any, { rejectWithValue, getState }) => {
    const { reportId } = data;
    const { user, infoFile } = getState() as any;
    const { id: userId } = user;
    const { cid } = infoFile;

    if (!userId || userId === '') return rejectWithValue('User is empty');
    if (!cid || cid === '') return rejectWithValue('CID is empty');

    return await axios
      .post(apiReportDelete, {
        cid,
        reportId,
        userId,
      })
      .then((res) => {
        const { reports } = res.data;
        return reports;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchDeleteReportReducer = {
  [fetchDeleteReport.pending as any]: (state: IInfoFile) => {
    state.fetchDeleteReport.loading = true;
  },
  [fetchDeleteReport.fulfilled as any]: (state: IInfoFile, action: any) => {
    toast.success('Report deleted deleted');
    state.reports = action.payload;
    state.fetchDeleteReport.loading = false;
  },
  [fetchDeleteReport.rejected as any]: (state: IInfoFile, action: any) => {
    state.fetchDeleteReport.loading = false;
    state.fetchDeleteReport.error = action.error.message;
  },
};
