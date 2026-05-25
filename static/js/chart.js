console.log('script actief')

document.addEventListener('DOMContentLoaded', function () {
  const runBtn = document.getElementById('runBtn')
  const resetBtn = document.getElementById('resetBtn')

  runBtn.addEventListener('click', async function () {
    try {
      const S = document.getElementById('susceptible').value
      const I = document.getElementById('infected').value

      const beta = document.getElementById('beta').value
      const gamma = document.getElementById('gamma').value
      const mu = document.getElementById('mu').value

      const days = document.getElementById('days').value

      const url = `/simulate?S=${S}&I=${I}&beta=${beta}&gamma=${gamma}&mu=${mu}&days=${days}`

      console.log('FETCH URL:', url)

      const response = await fetch(url)

      console.log('STATUS:', response.status)

      if (!response.ok) {
        console.error('SERVER ERROR:', response.status)
        return
      }

      const data = await response.json()
      console.log('DATA:', data)

      const ctx = document.getElementById('sirChart')

      if (window.sirChart && typeof window.sirChart.destroy === 'function') {
        window.sirChart.destroy()
      }

      window.sirChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.days.map(d => `Day ${d + 1}`),
          datasets: [
            {
              label: 'Susceptible',
              data: data.S.map(v => Math.round(v)),
              borderColor: '#0b3d91',
              fill: false
            },
            {
              label: 'Infected',
              data: data.I.map(v => Math.round(v)),
              borderColor: '#ef4444',
              fill: false
            },
            {
              label: 'Recovered',
              data: data.R.map(v => Math.round(v)),
              borderColor: '#22c55e',
              fill: false
            },
            {
              label: 'Deceased',
              data: data.D.map(v => Math.round(v)),
              borderColor: '#111827',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#0f172a',
                font: {
                  size: 14
                }
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#0f172a' },
              title: {
                display: true,
                text: 'Days',
                color: '#0f172a'
              }
            },
            y: {
              ticks: { color: '#0f172a' },
              title: {
                display: true,
                text: 'Population',
                color: '#0f172a'
              }
            }
          }
        }
      })
    } catch (error) {
      console.error('JS ERROR:', error)
    }
  })

  resetBtn.addEventListener('click', function () {
    document.getElementById('susceptible').value = ''
    document.getElementById('infected').value = ''
    document.getElementById('beta').value = ''
    document.getElementById('gamma').value = ''
    document.getElementById('mu').value = ''
    document.getElementById('days').value = ''

    if (window.sirChart && typeof window.sirChart.destroy === 'function') {
      window.sirChart.destroy()
    }

    window.sirChart = null
  })
})
