Copy-paste the entire prompt below into the new Figma account. This contains the **final dashboard structure**, **all finalized results**, **correct metrics**, **professional wording**, and the **exact pages** to create. No need to refer back to any previous version.

---

# CREATE A COMPLETE RESEARCH DASHBOARD FROM SCRATCH

## Project Title

**RL-Based Adaptive CPU Scheduler**

### Subtitle

Learning Adaptive CPU Scheduling Policies using Proximal Policy Optimization (PPO)

---

# DESIGN STYLE

Create a premium research dashboard with:

* Dark theme (#030712 background)
* Modern SaaS + Research Lab aesthetic
* Neon blue, cyan, and purple accents
* Professional typography
* Clean layout
* Left sidebar navigation
* Responsive desktop dashboard
* High-quality charts and cards
* Minimal clutter
* Suitable for:

  * GitHub Portfolio
  * Research Showcase
  * Internship Applications
  * Technical Presentations

The dashboard should feel like a polished AI research project rather than a student assignment.

---

# DASHBOARD STRUCTURE

Create exactly **5 pages**:

1. Overview
2. Classical Scheduler Benchmark
3. PPO Generalization Analysis
4. Stability & Fairness Analysis
5. Research Conclusions

---

# PAGE 1 — OVERVIEW

## Hero Section

### Title

RL-Based Adaptive CPU Scheduler

### Description

A Reinforcement Learning approach to CPU process scheduling using Proximal Policy Optimization (PPO). The project evaluates learned scheduling policies against classical operating-system scheduling algorithms across multiple workload distributions.

---

## Technology Tags

* Reinforcement Learning
* PPO
* Gymnasium
* Stable-Baselines3
* Python
* CPU Scheduling

---

## Statistics Cards

### Classical Algorithms

4

### RL Models

2

### Workload Types

5

### Training Timesteps

200,000

### Multi-Seed Evaluations

8

### Research Focus

Adaptive Scheduling Policies

---

## Architecture Flow Diagram

Workload Generator

↓

CPU Scheduling Environment

↓

State Representation

↓

PPO Agent

↓

Training

↓

Evaluation

---

## Key Findings Cards

### Finding 1

PPO achieved competitive scheduling performance without requiring burst-time oracle information.

### Finding 2

A single PPO policy generalized successfully across multiple workload distributions.

### Finding 3

Hyperparameter optimization produced stronger gains than expanding the state representation.

---

# PAGE 2 — CLASSICAL SCHEDULER BENCHMARK

## Title

Classical Scheduling Algorithms Benchmark

## Description

Performance comparison of traditional CPU scheduling algorithms.

---

## Exact Results

### FCFS

Average Waiting Time = 14.80

Average Turnaround Time = 19.00

Throughput = 0.23

Context Switches = 9

---

### SJF

Average Waiting Time = 8.30

Average Turnaround Time = 12.50

Throughput = 0.23

Context Switches = 9

---

### Round Robin

Average Waiting Time = 13.30

Average Turnaround Time = 17.50

Throughput = 0.23

Context Switches = 22

---

### Priority

Average Waiting Time = 12.70

Average Turnaround Time = 16.90

Throughput = 0.23

Context Switches = 9

---

## Visualizations

Create:

### Chart 1

Average Waiting Time Comparison

### Chart 2

Average Turnaround Time Comparison

### Chart 3

Context Switch Comparison

### Chart 4

Benchmark Metrics Table

---

## Insight Card

Shortest Job First achieved the lowest waiting time and turnaround time because it assumes prior burst-time knowledge, making it a strong theoretical scheduling baseline.

---

# PAGE 3 — PPO GENERALIZATION ANALYSIS

## Title

Cross-Workload Generalization

## Description

Evaluation of a single PPO policy across multiple workload distributions without retraining.

---

## Final PPO Results

### Normal

Average Waiting Time = 10.9

Average Turnaround Time = 15.1

---

### CPU Bound

Average Waiting Time = 18.3

Average Turnaround Time = 24.8

---

### IO Bound

Average Waiting Time = 0.6

Average Turnaround Time = 2.0

---

### Starvation

Average Waiting Time = 10.7

Average Turnaround Time = 18.9

---

### Mixed

Average Waiting Time = 2.4

Average Turnaround Time = 5.5

---

## Visualizations

### Chart 1

Waiting Time by Workload

### Chart 2

Turnaround Time by Workload

### Chart 3

Performance Heatmap

### Chart 4

Radar Chart Comparing All Workloads

---

## Research Observations

* PPO generalized successfully across all workload categories.
* Strongest performance occurred on Mixed and IO-Bound workloads.
* CPU-Bound workloads remained the most challenging scheduling scenario.
* Policy behavior remained stable despite workload variation.

---

## Highlight Card

Generalization achieved using a single trained PPO policy without workload-specific retraining.

---

# PAGE 4 — STABILITY & FAIRNESS ANALYSIS

## Title

Robustness and Fairness Evaluation

---

# Section A — Multi-Seed Evaluation

## NORMAL

### SJF

Mean WT = 12.54

Std WT = 3.39

Mean TAT = 17.66

Std TAT = 4.18

### PPO

Mean WT = 16.88

Std WT = 4.11

Mean TAT = 22.00

Std TAT = 4.82

---

## CPU BOUND

### SJF

Mean WT = 21.44

Std WT = 4.80

Mean TAT = 28.74

Std TAT = 5.30

### PPO

Mean WT = 24.72

Std WT = 5.94

Mean TAT = 32.02

Std TAT = 6.40

---

## IO BOUND

### SJF

Mean WT = 0.86

Std WT = 0.45

Mean TAT = 2.34

Std TAT = 0.47

### PPO

Mean WT = 1.10

Std WT = 0.62

Mean TAT = 2.58

Std TAT = 0.65

---

## STARVATION

### SJF

Mean WT = 15.24

Std WT = 5.54

Mean TAT = 23.44

Std TAT = 5.54

### PPO

Mean WT = 17.90

Std WT = 7.75

Mean TAT = 26.10

Std TAT = 7.75

---

## MIXED

### SJF

Mean WT = 8.28

Std WT = 4.07

Mean TAT = 12.92

Std TAT = 5.10

### PPO

Mean WT = 11.68

Std WT = 7.07

Mean TAT = 16.32

Std TAT = 8.10

---

# Section B — Fairness Analysis

## FCFS

Average WT = 20.8

Maximum WT = 61

Fairness Score = 0.565

Starved Processes = 4

---

## SJF

Average WT = 10.7

Maximum WT = 33

Fairness Score = 0.520

Starved Processes = 1

---

## Round Robin

Average WT = 11.4

Maximum WT = 38

Fairness Score = 0.366

Starved Processes = 3

---

## Priority

Average WT = 19.9

Maximum WT = 50

Fairness Score = 0.508

Starved Processes = 4

---

## PPO

Average WT = 10.7

Maximum WT = 50

Fairness Score = 0.383

Starved Processes = 1

---

## Visualizations

* Fairness Comparison Chart
* Starvation Comparison Chart
* Multi-Seed Stability Chart
* Mean vs Standard Deviation Plot

---

## Insight Card

PPO maintained competitive waiting times while matching SJF in starvation count, demonstrating balanced scheduling behavior without handcrafted scheduling rules.

---

# PAGE 5 — RESEARCH CONCLUSIONS

## Title

Research Findings and Conclusions

---

# System Pipeline

Workload Generator

↓

CPU Scheduling Environment

↓

State Representation

↓

PPO Agent

↓

Training Loop

↓

Evaluation Framework

---

# Key Findings

### Finding 1

PPO achieved competitive scheduling performance without relying on burst-time oracle information.

### Finding 2

A single PPO policy generalized across Normal, CPU-Bound, IO-Bound, Starvation, and Mixed workloads.

### Finding 3

Hyperparameter tuning improved scheduling performance more effectively than expanding the state representation.

### Finding 4

PPO maintained stable behavior across multiple random seeds and workload distributions.

### Finding 5

Reinforcement Learning successfully learned scheduling heuristics directly through environment interaction.

---

# Additional Study — Preemptive Scheduling

## SRTF

Average WT = 5.8

Maximum WT = 33

Average TAT = 14.0

Context Switches = 81

---

## Preemptive PPO

Average WT = 9.5

Maximum WT = 60

Average TAT = 17.7

Context Switches = 81

---

## Visualizations

* SRTF vs PPO Comparison Chart
* Radar Chart
* Summary Metrics Cards

---

## Professional Insight

Preemptive PPO demonstrated competitive scheduling behavior; however, SRTF remained superior in latency metrics due to access to perfect remaining-burst information. This highlights the challenge of learning optimal preemptive scheduling policies without privileged system knowledge.

---

# Limitations

* Synthetic workload generation
* Reward engineering sensitivity
* Offline training requirements
* Oracle schedulers remain stronger when burst-time information is available

---

# Future Work

* Multi-Core CPU Scheduling
* Real Workload Trace Evaluation
* PPO vs DQN vs A2C Comparison
* Fairness-Aware Reinforcement Learning
* Transformer-Based Scheduling Policies

---

# Final Conclusion

This research demonstrates that Reinforcement Learning can learn effective CPU scheduling policies directly from interaction with a simulated operating-system environment. PPO achieved competitive performance, generalized across diverse workload distributions, and reduced reliance on handcrafted scheduling rules, highlighting the potential of adaptive learning-based schedulers for future operating systems.

---

# Footer

RL-Based Adaptive CPU Scheduler

Research Dashboard

2026

---

Use elegant charts, premium spacing, consistent card styling, subtle glow effects, clear data hierarchy, and professional research-oriented visual design throughout the dashboard.
