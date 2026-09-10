# Project overview

This project is a packet-routing method for mesh networks, built on Completely Reusable Garbled Circuits (CRGC) from [arXiv:2203.12646](https://arxiv.org/abs/2203.12646) (v4, 6 May 2022).

The aim is routing where:

- the **sender does not plan the path**, and
- **routing nodes do not learn the destination**.

## How it works

I constructed a boolean circuit that takes **seven vectors** as input and outputs the **closest vector**, one-hot encoded. That comparison is the core of the routing decision, evaluated under CRGC so nodes can forward packets without learning where they are going.

Reusable garbled circuits in the Goldwasser sense (RGC) would be a stronger cryptographic fit, but they are not practical here. Realising them means stacking large amounts of functional encryption (FE), attribute-based encryption (ABE), and fully homomorphic encryption (FHE). CRGC is the approach that can actually run.

## Demo

I am building a visual graph tool that shows the method working: an interactive mesh where you can send messages and watch how they are routed.

## Competition

This is a submission to the Premier’s Coding Challenge, which focuses on educating Queenslanders about privacy and safety online. The submission argues why mesh networks will matter for privacy and safety in the future, and demonstrates a concrete way to route traffic without exposing destinations to the network.