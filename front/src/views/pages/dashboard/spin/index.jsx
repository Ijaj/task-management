import {
  Card,
  CardContent,
  Box,
  Typography,
  Grid,
} from '@mui/material';
import SpinningWheel from '../../../../components/wheel';
import SingleSelect from '../../../../components/multi-select';
import { taskCategories } from '../../../../utils/constants';



export default function Spin() {
  return (
    <Box sx={{ px: 8, margin: '-50px auto auto auto', position: 'relative', zIndex: 1 }}>
      <Card>
        <CardContent>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="h5" fontWeight={'bold'}>
                Spin the Wheel
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }} />
            <Grid size={{ xs: 12, sm: 6, md: 3 }} />

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <SingleSelect
                key={1}
                label='Select Task Category'
                options={taskCategories}
                onChange={(values) => { console.log(values) }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <SpinningWheel />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

