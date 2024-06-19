import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sampleData from '../stackline_frontend_assessment_data_2021.json';

export interface AnalyticsSaleItem {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
}
export interface AnalyticsItem {
    title: string;
    subtitle: string;
    image: string;
    tags: Array<string>;
    sales: Array<AnalyticsSaleItem>;
}
export interface AnalyticsState {
    items: Array<AnalyticsItem>;
    loading: boolean;
    error: string | null;
}

const initialState: AnalyticsState = {
    items: [],
    loading: false,
    error: null,
}

export const fetchItems = createAsyncThunk<AnalyticsItem[], void, { rejectValue: string }>(
    "githubIssue/fetchIssues",
    async (_, thunkAPI) => {
      try {
        // const response = await fetch();
        // const data = await response.json();
        const items = sampleData.map((issue: any) => issue as AnalyticsItem);
        return items;
      } catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch items.");
      }
    }
  );

export const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Unknown error";
            })
    },
});

export default analyticsSlice.reducer;