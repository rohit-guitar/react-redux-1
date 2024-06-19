import { useEffect, useState } from 'react';
import { ReactComponent as Logo } from './stackline_logo.svg';
import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'
import { Box, Button, ButtonGroup, Chip, Paper, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';

import './App.css';
import 'react-reflex/styles.css'
import AnalyticsPaginationActionsTable from './Table';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch } from './store';
import { fetchItems } from './reducers/analyticsReducer';

function App() {
  const dispatch: AppDispatch = useAppDispatch();
  const sampleData = useSelector((state: RootState) => state.analytics.items);
  const loading = useSelector((state: RootState) => state.analytics.loading);
  const error = useSelector((state: RootState) => state.analytics.error);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  const isNextDisable = () => {
    console.log(sampleData.length);
    if (sampleData.length <= (currentItemIndex + 1)) {
      return true;
    }    
    return false;
  }

  const isPreDisable = () => {
    if (currentItemIndex > 0) {
      return false;
    }
    return true;
  }
  const currentItem = !!sampleData && sampleData.length > 0 && sampleData[currentItemIndex];

  const getLineChartYaxis = () => {
    // returning all lines
    return [ 
      { 
        data: !!currentItem ? currentItem.sales.map(data => data.retailSales) : []
      },
      { 
        data: !!currentItem ? currentItem.sales.map(data => data.wholesaleSales) : []
      },
      { 
        data: !!currentItem ? currentItem.sales.map(data => data.unitsSold) : []
      },
      { 
        data: !!currentItem ? currentItem.sales.map(data => data.retailerMargin) : []
      },
    ];
  }

  return (
    <>
      {!!currentItem && (
        <ReflexContainer orientation="horizontal">
            <ReflexElement flex={0.1}>
              <div className="pane-content">
                <div style={{backgroundColor: `rgb(11,34,63)`}}>
                  <div style={{width: '100px', padding: '10px'}}>
                    <Logo />
                  </div>
                </div>
              </div>
            </ReflexElement>
            <ReflexSplitter />
            <ReflexElement>
              <ReflexContainer orientation="vertical" style={{backgroundColor: `rgb(245, 247, 249)`}}>
                <ReflexElement maxSize={300} style={{
                    alignContent: 'center',
                    marginLeft: '20px',
                    marginTop: '20px'
                  }}
                >
                  <Paper
                    sx={{
                      borderRadius: 1, 
                      padding: '10px'
                    }}
                    // alignItems="center"
                    // padding={5}
                    // p={2}
                  >
                    <img
                      src={currentItem.image}
                      loading="lazy"
                      height={200}
                    />
                    <Box
                      marginBlockEnd={5}
                    >
                      <Typography align={'center'} variant="h6">
                        {currentItem.title ?? ""}
                      </Typography>
                      <Typography align={'center'} variant="body2">
                        {currentItem.subtitle ?? ""}
                      </Typography>
                    </Box>

                    {!!currentItem.tags && currentItem.tags.map((tag: string) => (
                      <Chip label={tag} variant='outlined' />
                    ))}
                    <br />
                    <Box 
                      marginBlockStart={5}
                      alignItems="center"
                    >
                      <ButtonGroup
                        disableElevation
                        variant="outlined"
                      >
                        <Button disabled={isNextDisable()} onClick={() => setCurrentItemIndex(currentItemIndex + 1)}>Next</Button>
                        <Button disabled={isPreDisable()} onClick={() => setCurrentItemIndex(currentItemIndex - 1)}>Previous</Button>
                      </ButtonGroup>
                    </Box>
                  </Paper>
                </ReflexElement>
                <ReflexElement className="right-pane">
                  <ReflexContainer orientation="horizontal">
                    <ReflexElement 
                      style={
                        {
                          marginInlineStart: '40px',
                          marginInlineEnd: '40px',
                          marginBlockStart: '20px',
                          marginBlockEnd: '20px',
                          maxHeight: '700px',
                          maxWidth: '1000px'
                        }}>
                      <Paper>
                        <LineChart 
                          xAxis={[
                            { scaleType: "utc", data: !!currentItem ? currentItem.sales.map(data => new Date(data.weekEnding)) : [] }]}
                          series={getLineChartYaxis()}
                          height={700}
                          sx={{padding:'20px'}}
                          />
                        </Paper>
                    </ReflexElement>
                    <ReflexElement>
                      <Box
                        alignContent={'center'}
                        paddingInlineStart={5}
                        paddingInlineEnd={5}
                      >
                        <AnalyticsPaginationActionsTable item={currentItem} />
                      </Box>
                    </ReflexElement>
                  </ReflexContainer>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
        </ReflexContainer>
      )}
    </>
  );
}

export default App;
