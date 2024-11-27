document.addEventListener('DOMContentLoaded', () => {
    // Fetch Analytics Data
    async function fetchAnalytics() {
        try {
            const response = await fetch('/api/analytics');
            const data = await response.json();

            const analyticsDiv = document.getElementById('analytics-data');

            if (!Object.keys(data).length) {
                analyticsDiv.innerHTML = `<p class="text-danger">No analytics data available.</p>`;
                return;
            }

            analyticsDiv.innerHTML = `
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Page</th>
                            <th>Views</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(data)
                            .map(([page, views]) => `<tr><td>${page}</td><td>${views}</td></tr>`)
                            .join('')}
                    </tbody>
                </table>
            `;
        } catch (error) {
            console.error('Error fetching analytics data:', error);

            const analyticsDiv = document.getElementById('analytics-data');
            analyticsDiv.innerHTML = `
                <p class="text-danger">An error occurred while fetching analytics data. Please try again later.</p>
            `;
        }
    }

    fetchAnalytics(); // Fetch analytics data on page load

    // Toggle Spreadsheet Visibility
    const buttons = [
        { id: 'showFormButton1', containerId: 'spreadsheet-container1', frameId: 'spreadsheet-frame1', src: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMLFDU_fIxKBCkSqITxYkfdthnnENQYNP6Y1k_VRt3w6LIxkBEoZuLBC8YX0t1kdJYWWDkpJMnAvq4/pubhtml?gid=1657696850&amp;single=true&amp;widget=true&amp;headers=false', text: 'View OCD Reflection Results', closeText: 'Close OCD Results' },
        { id: 'showFormButton2', containerId: 'spreadsheet-container2', frameId: 'spreadsheet-frame2', src: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSrrvMVJii28O-bBUbwCchIz9X65us4LNtJxEsFUdC_PdkU6vECjLVT_4ziynH1ET19djQtbwmUwPfQ/pubhtml?gid=2038547650&amp;single=true&amp;widget=true&amp;headers=false', text: 'View PTSD Reflection Results', closeText: 'Close PTSD Results' },
        { id: 'showFormButton3', containerId: 'spreadsheet-container3', frameId: 'spreadsheet-frame3', src: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRfi33LmGzy1w7xL_T9-kaFkenWpaw7uV0cTcAEHMk-jEC1HwLCB1xts1A72veYhyvjrhiMpyGBjcOg/pubhtml?gid=1134131085&amp;single=true&amp;widget=true&amp;headers=false', text: 'View GAD Reflection Results', closeText: 'Close GAD Results' },
        { id: 'showFormButton4', containerId: 'spreadsheet-container4', frameId: 'spreadsheet-frame4', src: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT1jmmbpu_liYJcsA17sB2PRsnDckNDPjM3fuX9bktv51bIWrdyLvnniqmv_rgUplwA4H793q7q6OpK/pubhtml?gid=1480220901&amp;single=true&amp;widget=true&amp;headers=false', text: 'View Panic Disorder Results', closeText: 'Close Panic Disorder Results' },
        { id: 'showFormButton5', containerId: 'spreadsheet-container5', frameId: 'spreadsheet-frame5', src: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRACjPjQ8F8pnk4UbsBZcQSD71Ry0hOhPR2NjctYm1x26XFzA8vbP8uAp2E1Q31YRQ0oGJLra4OyfWg/pubhtml?gid=1103614980&amp;single=true&amp;widget=true&amp;headers=false', text: 'View Schizophrenia Reflection Results', closeText: 'Close Schizophrenia Results' },
        { id: 'showFormButton6', containerId: 'spreadsheet-container6', frameId: 'spreadsheet-frame6', src: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSUpzCplNqAs2OC5JIkvFSNrxI4OiSKBMSMxwbb7D7hjAjsbRgsrRF5fcoVcGQQZZl_5bSfjn7GVRU2/pubhtml?gid=1590677822&amp;single=true&amp;widget=true&amp;headers=false', text: 'View Depression Reflection Results', closeText: 'Close Depression Results' },
    ];

    buttons.forEach(button => {
        const showFormButton = document.getElementById(button.id);
        const spreadsheetContainer = document.getElementById(button.containerId);
        const spreadsheetFrame = document.getElementById(button.frameId);

        showFormButton.addEventListener('click', () => {
            const isSpreadsheetVisible = spreadsheetContainer.style.display === 'block';

            if (isSpreadsheetVisible) {
                // Hide the spreadsheet and update button text
                spreadsheetContainer.style.opacity = '0';
                setTimeout(() => {
                    spreadsheetContainer.style.display = 'none';
                    spreadsheetFrame.src = '';
                }, 300); // Match fade-out transition
                showFormButton.textContent = button.text;
            } else {
                // Show the spreadsheet and update button text
                spreadsheetFrame.src = button.src;
                spreadsheetContainer.style.display = 'block';
                setTimeout(() => {
                    spreadsheetContainer.style.opacity = '1';
                }, 50); // Trigger fade-in effect
                buttons.forEach(btn => document.getElementById(btn.id).textContent = btn.text);
                showFormButton.textContent = button.closeText;
            }
        });
    });
});
