import matplotlib.pyplot as plt


def plot_comparison_graphs(results):

    algorithms = [
        r["algorithm"]
        for r in results
    ]

    waiting_times = [
        r["avg_wt"]
        for r in results
    ]

    turnaround_times = [
        r["avg_tat"]
        for r in results
    ]

    throughputs = [
        r["throughput"]
        for r in results
    ]

    context_switches = [
        r["context_switches"]
        for r in results
    ]

    fig, axes = plt.subplots(
        2,
        2,
        figsize=(14, 8)
    )

    # Average Waiting Time
    axes[0, 0].bar(
        algorithms,
        waiting_times
    )
    axes[0, 0].set_title(
        "Average Waiting Time"
    )
    axes[0, 0].set_ylabel(
        "Time"
    )

    # Average Turnaround Time
    axes[0, 1].bar(
        algorithms,
        turnaround_times
    )
    axes[0, 1].set_title(
        "Average Turnaround Time"
    )
    axes[0, 1].set_ylabel(
        "Time"
    )

    # Throughput
    axes[1, 0].bar(
        algorithms,
        throughputs
    )
    axes[1, 0].set_title(
        "Throughput"
    )
    axes[1, 0].set_ylabel(
        "Processes / Unit Time"
    )

    # Context Switch Count
    axes[1, 1].bar(
        algorithms,
        context_switches
    )
    axes[1, 1].set_title(
        "Context Switch Count"
    )
    axes[1, 1].set_ylabel(
        "Switches"
    )

    plt.tight_layout()

    plt.savefig(
        "results/comparison_metrics.png"
    )

    plt.show()