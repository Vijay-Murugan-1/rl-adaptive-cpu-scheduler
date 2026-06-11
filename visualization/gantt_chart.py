import matplotlib.pyplot as plt


def plot_gantt_chart(timeline):

    fig, ax = plt.subplots()

    for process_id, start, end in timeline:

        ax.barh(
            y=f"P{process_id}",
            width=end - start,
            left=start
        )

        ax.text(
            x=(start + end) / 2,
            y=f"P{process_id}",
            s=f"P{process_id}",
            va='center',
            ha='center',
            color='white'
        )

    ax.set_xlabel("Time")

    ax.set_title("Priority Scheduling Gantt Chart")

    plt.show()