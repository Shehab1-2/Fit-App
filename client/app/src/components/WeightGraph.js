import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import dummyUserData from './DummyData'; // Ensure dummy data is correctly imported

const WeightGraph = ({ username }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5001/api/users/get-weights?username=${username}`);
        let result;

        // Check if API response is successful
        if (!response.ok) {
          result = dummyUserData; // Use dummy data if response fails
        } else {
          result = await response.json();
        }

        // Map data for the chart
        const data = result.weights.map(item => ({
          date: new Date(item.date).toLocaleDateString(),
          weight: item.weight
        }));

        setChartData(data);
      } catch (error) {
        console.error('Failed to fetch weight data:', error);
        setError(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [username]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  // Prepare data for the chart
  const labels = chartData.map(item => item.date);
  const weights = chartData.map(item => item.weight);

  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: weights,
              color: () => '#82ca9d',
              strokeWidth: 2
            }
          ]
        }}
        width={Dimensions.get('window').width * 0.9} // Adjust width to fit screen
        height={400}
        yAxisSuffix=" lb"
        chartConfig={{
          backgroundColor: '#121212',
          backgroundGradientFrom: '#1e1e1e',
          backgroundGradientTo: '#121212',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#82ca9d'
          }
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginVertical: 10
  },
  chart: {
    borderRadius: 16
  }
});

export default WeightGraph;
