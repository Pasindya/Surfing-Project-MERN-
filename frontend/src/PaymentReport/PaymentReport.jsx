import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Pie, Bar } from 'react-chartjs-2'; // Import Bar
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement, ArcElement, BarElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement, ArcElement, BarElement); // Register BarElement

const PaymentReport = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:5009/payments');
            setPayments(response.data);
        } catch (error) {
            setError('Error fetching payment data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotalAmount = () => {
        return payments.reduce((total, payment) => total + parseFloat(payment.TotalAmount || 0), 0).toFixed(2);
    };

    const getLineChartData = () => {
        const labels = payments.map((_, index) => `PA ${index + 1}`);
        const amounts = payments.map(() => Math.floor(Math.random() * 100) + 1);
        return {
            labels,
            datasets: [
                {
                    label: 'Payments Over Time',
                    data: amounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                }
            ],
        };
    };

    const getPieChartData = () => {
        const cardTypesCount = payments.reduce((acc, payment) => {
            acc[payment.CardType] = (acc[payment.CardType] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(cardTypesCount),
            datasets: [
                {
                    label: 'Payment Methods',
                    data: Object.values(cardTypesCount),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                    ],
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 1,
                }
            ],
        };
    };

    const getBarChartData = () => {
        const statusCount = payments.reduce((acc, payment) => {
            acc[payment.Status] = (acc[payment.Status] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(statusCount),
            datasets: [
                {
                    label: 'Payment Status',
                    data: Object.values(statusCount),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                    ],
                }
            ],
        };
    };

    const styles = {
        bodyContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: 'transparent',
            backgroundImage: 'url("https://images.unsplash.com/photo-1556740772-1a741367b93e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },
        container: {
            maxWidth: '2500px',
            width: '100%', // Adjusted for a better width on larger screens
            margin: '0 auto',
            padding: '20px',
            backgroundColor: 'transparent',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(50px)',
        },
        heading: {
            color: '#000000',
            fontFamily: 'Arial, sans-serif',
            fontSize: '2.5em',
            fontWeight: 'bold',
            marginBottom: '10px',
            textAlign: 'center',
        },
        subHeading: {
            color: '#000000',
            fontFamily: 'Arial, sans-serif',
            fontSize: '1.5em',
            fontWeight: 'bold',
            marginBottom: '10px',
            textAlign: 'center',
        },
        flexContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '40px',
        },
        leftSection: {
            flex: 1,
            marginRight: '10px',
            backgroundColor: '#f1f1f1',
            borderRadius: '1px',
            padding: '25px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
        rightSection: {
            flex: 1,
            marginLeft: '10px',
            backgroundColor: '#f1f1f1',
            borderRadius: '8px',
            padding: '25px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
        chartsContainer: {
            marginBottom: '60px',
        },
        chart: {
            marginBottom: '22px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '45px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            height: '400px', // Increased height for charts
            width: '100%', // Full width
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
        },
        th: {
            padding: '12px',
            textAlign: 'center',
            borderBottom: '2px solid #ddd',
            backgroundColor: '#0085c6',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5em',
            whiteSpace: 'nowrap',
            width: '150px',
        },
        td: {
            padding: '12px',
            textAlign: 'center',
            borderBottom: '1px solid #ddd',
            backgroundColor: '#D3D3D3',
            fontSize: '1.2em',
            transition: 'background-color 0.3s',
            whiteSpace: 'nowrap',
            color: '#000000',
            fontWeight: 'bold',
            width: '150px',
        },
        loading: {
            textAlign: 'center',
            fontSize: '18px',
            color: '#0000ff',
        },
        error: {
            textAlign: 'center',
            fontSize: '18px',
            color: '#ff0000',
        },
        tableContainer: {
            overflowY: 'auto',
            maxHeight: '400px',
        },
        button: {
            display: 'block',
            width: '35%',
            padding: '10px',
            backgroundColor: '#cd9b1b',
            color: 'white',
            textAlign: 'center',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.7em',
            cursor: 'pointer',
            marginTop: '20px',
            textDecoration: 'none',
            marginLeft: '30%',
        },
    };

    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    return (
        <div style={styles.bodyContainer}>
            <div style={styles.container}>
                <h1 style={styles.heading}>Payment Report</h1>
                <h2 style={styles.subHeading}>Total Amount: ${calculateTotalAmount()}</h2>

                <div style={styles.flexContainer}>
                    <div style={styles.leftSection}>
                        <div style={styles.chartsContainer}>
                            <div style={styles.chart}>
                            <h3 style={{ textAlign: 'center', fontSize: '1.8em' }}>Line Chart</h3>
                                <Line data={getLineChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
                            </div>
                            <div style={styles.chart}>
                            <h3 style={{ textAlign: 'center', fontSize: '1.8em' }}>Pie Chart</h3>
                                <Pie data={getPieChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>

                    <div style={styles.rightSection}>
                        <div style={styles.chart}>
                        <h3 style={{ textAlign: 'center', fontSize: '1.8em' }}>Bar Chart</h3>
                            <Bar data={getBarChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>

                <h3 style={{ textAlign: 'center', fontSize: '1.8em' }}>Payment Details</h3>
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Full Name</th>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>Mobile</th>
                                <th style={styles.th}>Address</th>
                                <th style={styles.th}>Card Type</th>
                                <th style={styles.th}>Total Amount</th>
                                <th style={styles.th}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id} style={styles.tableRow}>
                                    <td style={styles.td}>{payment.FullName}</td>
                                    <td style={styles.td}>{payment.Email}</td>
                                    <td style={styles.td}>{payment.Mobile}</td>
                                    <td style={styles.td}>{payment.Address}</td>
                                    <td style={styles.td}>{payment.CardType}</td>
                                    <td style={styles.td}>${payment.TotalAmount}</td>
                                    <td style={styles.td}>{payment.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    
                    <button style={styles.button} onClick={() => navigate('/admin/payments/summary')}>Payment Summary</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentReport;
