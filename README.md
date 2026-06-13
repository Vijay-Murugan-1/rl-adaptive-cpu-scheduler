# RL-Based Adaptive CPU Scheduler

A Reinforcement Learning based CPU Scheduling simulator that compares traditional scheduling algorithms with PPO-based adaptive schedulers across multiple workload types.

## Features

### Classical Scheduling Algorithms

- FCFS (First Come First Serve)
- SJF (Shortest Job First)
- Round Robin
- Priority Scheduling
- SRTF (Shortest Remaining Time First)

### Reinforcement Learning Schedulers

- PPO-based Non-Preemptive Scheduler
- PPO-based Preemptive Scheduler
- Custom Gymnasium Environments
- Stable-Baselines3 Integration

### Workload Types

- Normal Workloads
- CPU-Bound Workloads
- I/O-Bound Workloads
- Starvation-Oriented Workloads
- Mixed Workloads

### Evaluation & Analysis

- PPO vs Classical Scheduler Comparison
- PPO vs SRTF Comparison
- Cross-Workload Generalization Testing
- Workload Benchmarking Framework

## Performance Metrics

- Average Waiting Time
- Maximum Waiting Time
- Average Turnaround Time
- Throughput
- Context Switch Count

## Tech Stack

- Python
- Gymnasium
- Stable-Baselines3 (PPO)
- NumPy
- Matplotlib

## Project Structure

```text
core/
schedulers/
workloads/
rl_environment/
rl_training/
visualization/
experiments/
```

## Run the Project

### Compare Classical Schedulers

```bash
python -m experiments.compare_schedulers
```

### Train PPO Agent (Non-Preemptive)

```bash
python -m rl_training.train_ppo
```

### Evaluate PPO Agent

```bash
python -m rl_training.evaluate_agent
```

### Compare PPO vs Classical Schedulers

```bash
python -m rl_training.compare_rl_vs_classical
```

### Train PPO Agent (Preemptive)

```bash
python -m rl_training.train_ppo_preemptive
```

### Evaluate Preemptive PPO Agent

```bash
python -m rl_training.evaluate_preemptive_agent
```

### Compare PPO vs SRTF

```bash
python -m rl_training.compare_preemptive_rl_vs_srtf
```

### Benchmark Classical Schedulers Across Workloads

```bash
python -m experiments.workload_benchmark
```

### PPO Generalization Benchmark

```bash
python -m experiments.ppo_generalization_benchmark
```

### Full Workload Comparison

```bash
python -m experiments.full_workload_comparison
```

## Experimental Results

### Non-Preemptive Scheduling

| Algorithm | Avg WT | Avg TAT |
|-----------|--------|---------|
| SJF | 10.7 | 18.9 |
| PPO | 10.7 | 18.9 |

PPO converged to SJF-level performance on starvation-oriented workloads.

### Preemptive Scheduling

| Algorithm | Avg WT | Avg TAT |
|-----------|--------|---------|
| SRTF | 5.8 | 14.0 |
| PPO | 10.1 | 18.3 |

PPO performance improved significantly through reward engineering and extended training.

### PPO Generalization Results

The PPO agent was trained exclusively on starvation-oriented workloads and evaluated on unseen workload types.

| Workload | Avg WT | Avg TAT |
|-----------|--------|---------|
| Normal | 11.9 | 16.1 |
| CPU Bound | 19.4 | 25.9 |
| I/O Bound | 0.5 | 1.9 |
| Starvation | 10.7 | 18.9 |
| Mixed | 3.5 | 6.6 |

Key Finding:

> A PPO agent trained on starvation-oriented workloads demonstrated partial generalization to unseen workload types, matching SJF performance on starvation and I/O-bound workloads while remaining competitive on mixed workloads.

## Future Work

- Fairness-Aware Reward Functions
- Starvation Reduction Metrics
- Multi-Core CPU Scheduling
- Dynamic Workload Generation
- DQN Scheduler
- A2C Scheduler
- Interactive Dashboard
- Training Curve Analysis
- Cross-Seed Robustness Evaluation

## Author

**Vijay**
